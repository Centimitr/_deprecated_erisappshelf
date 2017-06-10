import {IBook, IItem, IList, ISeries, ISource} from './source';
import nm from './nightmare';
import {DownloadManager, get, Lock} from './util';
import args from '../app/args';
import {Injectable} from '@angular/core';
import {AppStorage, AppStorageValue} from '../app/storage.service';

class Book implements IBook {
  name: string;
  url: string;
  page: number;
  manager = new DownloadManager(8);

  static from(obj: object) {
    const b = new Book(obj['href']);
    b.name = obj['name'];
    b.page = obj['page'];
    return b;
  }

  constructor(url: string) {
    this.url = url;
  }

  async download(dst: string) {
    const front = this.url.slice(0, -1);
    const urls = (new Array(this.page)).fill(0).map((v, i) => `${front}-p${i + 1}/`);
    const getUrlLastPart = function (url: string) {
      return url.split('/').filter(str => str.length).pop();
    };
    const getTargetPath = (filename: string) => {
      const require = window['require'];
      const os = require('os');
      const path = require('path');
      return path.resolve(os.tmpdir(), 'com.devbycm.eris', getUrlLastPart(this.url), filename);
    };
    const downloadFn = async function (url: string) {
      const n = nm({webPreferences: {webSecurity: false, nodeIntegration: true}});
      return await n.goto(url)
        .kit.init()
        .wait(function () {
          const kit = window['_cmViewKit'];
          const img = kit.qs('#cpimg');
          return img && img.complete;
        })
        .evaluate(function (path) {
          const kit = window['_cmViewKit'];
          const img = kit.qs('#cpimg');
          return new Promise(function (resolve, reject) {
            if (img) {
              kit.getImgBuf(img).then(buf => {
                kit.outputFileSync(path, buf);
                resolve(path);
              })
            } else {
              reject('no img');
            }
          })
        }, getTargetPath(getUrlLastPart(url) + '.webp'))
        .end();
    };
    this.manager.init(urls, downloadFn);
    console.log('!start');
    const imgPaths = await this.manager.run();
    console.log('!Complete');
    console.log(imgPaths);
    // await args.wait();
    console.log(args);
    // await get(args.path, {method: 'PUT', body: form});
    await fetch('https://localhost:3455/pack', {
      method: 'PUT',
      body: JSON.stringify({
        Dst: dst,
        BookMeta: {
          Name: this.name,
          Author: 'Unknown Author',
          Publisher: 'Unknown Publisher',
          Pages: imgPaths.map(p => ({Locator: p})),
          LastRead: null
        }
      })
    });
  }
}

class Series implements ISeries {
  name = '';
  url: string;
  books = [];
  image: string;
  meta: object = {};
  private _lock = new Lock();

  constructor(url: string) {
    this.url = url;
  }

  loading() {
    return !this._lock.available();
  }

  async update() {
    const l = this._lock;
    if (l.available()) {
      l.lock();
      const n = nm({show: false});
      try {
        const data = await n.goto(this.url)
          .kit.init()
          .wait('a.tg')
          .evaluate(function () {
            const kit = window['_cmViewKit'];
            const uls = kit.toArray(kit.qsa('ul.sy_nr1.cplist_ullg'));
            const len = uls.length;
            const ul = len === 2 ? uls[1] : uls[0];
            const needReverse = len === 2;
            const books = kit.toArray(ul.querySelectorAll('a.tg'))
              .map(a => ({
                href: a.href,
                name: a.innerText,
                page: parseInt(a.nextSibling.textContent.match(/-?[1-9]\d*/).shift(), 10)
              }));
            const image = kit.asIf(kit.qs('.main .sy_k1.z img'), kit.imgToDataUrl);
            const meta = {};
            return {
              image,
              meta,
              books: needReverse ? books.reverse() : books
            }
          })
          .end();
        if (data) {
          this.image = data.image;
          this.meta = data.meta;
          this.books = data.books.map(b => Book.from(b));
        }
      } catch (e) {
        console.warn(e);
      }
      l.unlock();
    }
  }
}

class LatestList implements IList {
  name = 'Latest';
  url = 'http://www.1kkk.com/manhua-new/';
  items: IItem[];
  private _lock = new Lock();
  private _s: AppStorageValue;

  constructor(private s: AppStorage) {
    // this._s = s.get('source.1kkk.latestList');
    // this.items = this._s.get([]);
  }

  loading() {
    return !this._lock.available();
  }

  async update() {
    const l = this._lock;
    if (l.available()) {
      l.lock();
      const n = nm({show: false});
      try {
        const itemValues = await n.goto(this.url)
          .kit.init()
          .wait('.main .kk2 ul')
          .kit.removeSurroundAll('.main .kk2 ul')
          .evaluate(function () {
            const kit = window['_cmViewKit'];
            const items = kit.toArray(kit.qsa('.main .kk2 ul li .cover'));
            return items.map(item => {
              const s = item.querySelector('a');
              const image = kit.asIf(item.querySelector('img'), kit.imgToDataUrl);
              const b = item.querySelector('span a');
              return {
                series: {
                  name: s.textContent.trim(),
                  href: s.href,
                  image
                },
                book: {
                  name: b.textContent.trim(),
                  href: b.href
                },
                other: {
                  text: item.textContent
                }
              }
            });
          }).end();
        if (itemValues) {
          this.items = itemValues.map(v => Object.assign(v, {
            toSeries() {
              return new Series(v.series.href);
            }
          }));
          // this._s.set(this.items);
        }
      } catch (e) {
        console.warn(e)
      }
      l.unlock();
    }
  }
}

@Injectable()
export class Source1kkk implements ISource {
  name = '1kkk';
  lists: IList[];

  constructor(private s: AppStorage) {
    this.lists = [
      new LatestList(s),
      new LatestList(s)
    ];
  }

  async update() {
    await this.lists[0].update();
  }
}

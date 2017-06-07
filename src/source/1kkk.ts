import {IBook, IItem, IList, ISeries, ISource} from './source';
import nm from './nightmare';
import {Lock} from './util';

class Book implements IBook {
  name: string;
  url: string;
  page: number;

  static from(obj: object) {
    const b = new Book(obj['href']);
    b.name = obj['name'];
    b.page = obj['page'];
    return b;
  }

  constructor(url: string) {
    this.url = url;
  }

  async download() {

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
  items = [];
  private _lock = new Lock();

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
        }
      } catch (e) {
        console.warn(e)
      }
      l.unlock();
    }
  }
}

class Source implements ISource {
  name = '1kkk';
  lists: IList[] = [
    new LatestList(),
    new LatestList()
  ];

  constructor() {
  }

}

const Source1kkk = new Source();
export default Source1kkk;

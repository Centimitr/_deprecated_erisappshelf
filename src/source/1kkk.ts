import {IBook, IItem, IList, ISeries, ISource} from './source';
import nm from './nightmare';
import {Lock} from './util';

class Book implements IBook {
  name = '';

  save(path: string) {
    return new Promise<void>(res => res())
  }
}

class Series implements ISeries {
  name = '';
  books = [];

  update() {

  }
}

class LatestList implements IList {
  name = 'Latest';
  url = 'http://www.1kkk.com/manhua-new/';
  items = [];
  private _lock = new Lock();

  async update() {
    const l = this._lock;
    if (l.available()) {
      l.lock();
      const n = nm({show: false});
      this.items = await n.goto(this.url)
        .wait('.main .kk2 ul')
        .kit.init()
        .kit.removeSurroundAll('.main .kk2 ul')
        .evaluate(function () {
          const kit = window['_cmViewKit'];
          const items = kit.toArray(kit.qsa('.main .kk2 ul li .cover'));
          return items.map(item => {
            const s = item.querySelector('a');
            const b = item.querySelector('span a');
            return {
              series: {
                name: s.textContent.trim(),
                href: s.href
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
        });
      l.unlock();
    }
  }
}

class Source implements ISource {
  name = '1kkk';
  lists: IList[] = [
    new LatestList()
  ];

  constructor() {
  }

}

const Source1kkk = new Source();
export default Source1kkk;

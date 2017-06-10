import {DownloadManager} from './util';

export interface IProgress {
  init: Function
  completed: Function
  total: Function
  ok: Function
}

export class Progress {
  private _total = 0;
  private _completed = 0;

  init(total: number) {
    this._completed = 0;
    this._total = total;
  }

  completeOne() {
    if (this._completed < this._total) {
      this._completed++;
    }
  }

  total() {
    return this._total;
  }

  completed() {
    return this._completed;
  }

  ok() {
    return this._completed === this._total;
  }
}

export interface IBook {
  name: string
  url: string
  manager?: DownloadManager;
  progress?: IProgress;
  download: Function
}

export interface ISeries {
  name: string
  image?: string
  books: IBook[]
  update: Function;
  loading: Function;
}

export interface IItemSeries {
  name: string
  href: string
  image?: string
}

export interface IItemBook {
  name: string
  href: string
}

export interface IItemOther {
  text: string
}

export interface IItem {
  series: IItemSeries
  book: IItemBook
  other: IItemOther
  toSeries?: Function
}

export interface IList {
  name: string
  items: IItem[]
  update: Function;
  loading: Function;
}

export interface ISource {
  name: string
  image?: string
  lists: IList[]
  update: Function;
}

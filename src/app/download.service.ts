import {Injectable} from '@angular/core';
import {IBook} from '../source/source';
const path = window['require']('path');

@Injectable()
export class DownloadService {
  books: IBook[] = [];
  saveFolder = '/Users/shixiao/Eris/';

  constructor() {
  }

  start() {

  }

  pause() {

  }

  add(book: IBook) {
    if (!this.books.some(b => b.url === book.url)) {
      this.books.push(book);
      if (1) {
        book.download(path.resolve(this.saveFolder, (book.name || Date.now()) + '.eris'));
      }
    }
  }
}

import {Injectable} from '@angular/core';
import {IBook} from '../source/source';

@Injectable()
export class DownloadService {
  books: IBook[] = [];

  constructor() {
  }

  add(book: IBook) {
    if (!this.books.some(b => b.url === book.url)) {
      this.books.push(book);
    }
  }

}

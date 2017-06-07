import {Injectable} from '@angular/core';
import {IBook} from '../source/source';

@Injectable()
export class DownloadService {
  books: IBook[] = [];

  constructor() {
  }

  addTask(b: IBook) {
    this.books.push(b);
  }

}

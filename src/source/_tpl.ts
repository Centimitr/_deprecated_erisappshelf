import {IBook, IList, ISeries, ISource} from './source';

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

class List implements IList {
  name = '';
  items = [];

  update() {
  }
}

class Source implements ISource {
  name = 'XXX';
  lists = [];
}


const SourceXXX = new Source();
export default SourceXXX;

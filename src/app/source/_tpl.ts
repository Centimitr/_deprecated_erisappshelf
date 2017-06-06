import {IBook, IList, ISeries, ISource} from './source';

class Book implements IBook {
  name = '';

  save(path: string) {
    return new Promise<void>(res => res())
  }
}

class Series implements ISeries {
  name = '';

  books() {
    return new Promise<IBook[]>(res => res([]))
  }
}

class List implements IList {
  name = '';

  items() {
    return new Promise<ISeries[]>(res => res([]))
  }
}

class Source implements ISource {
  name = 'XXX';

  lists() {
    return new Promise<IList[]>(res => res([]))
  }
}


const SourceXXX = new Source();
export default SourceXXX;

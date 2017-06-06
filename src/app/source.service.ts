import {Injectable} from '@angular/core';
import {ISource} from '../source/source';
import Source1kkk from '../source/1kkk';

@Injectable()
export class SourceService {

  private sources: ISource[] = [];

  constructor() {
    this.register(Source1kkk);
  }

  get(name: string) {
    return this.sources.filter(s => s.name === name).pop();
  }

  all(): ISource[] {
    return this.sources;
  }

  register(s: ISource) {
    this.sources.push(s)
  }
}

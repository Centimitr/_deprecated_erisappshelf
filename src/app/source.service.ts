import {Injectable} from '@angular/core';
import {ISource} from '../source/source';
import {Source1kkk} from '../source/1kkk';

@Injectable()
export class SourceService {

  private sources: ISource[] = [];

  constructor(private s1kkk: Source1kkk) {
    this.register(s1kkk);
  }

  get(name: string) {
    return this.sources.filter(s => s.name === name).pop();
  }

  all(): ISource[] {
    // this.sources.forEach(s => s.update());
    return this.sources;
  }

  register(s: ISource) {
    this.sources.push(s)
  }
}

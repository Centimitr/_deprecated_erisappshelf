import {Component} from '@angular/core';
import args from './args';
import {SourceService} from './source.service';
import {ISource} from './entity/source';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedSource: ISource;

  constructor(public sourceService: SourceService) {
    (async function () {
      await args.wait();
    })()
  }

  select(s?: ISource) {
    this.selectedSource = s;
  }

  isSelected(s: ISource) {
    return this.selectedSource === s;
  }
}

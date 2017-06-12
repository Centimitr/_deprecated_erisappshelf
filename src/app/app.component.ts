import {Component} from '@angular/core';
import args from './args';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selected = 0;
  panels = [{name: 'shelf'}, {name: 'source'}];

  constructor() {
    (async function () {
      await args.wait();
    })()
  }

  setSelected(index: number) {
    this.selected = index;
  }

  isSelected(index: number) {
    return index === this.selected;
  }
}

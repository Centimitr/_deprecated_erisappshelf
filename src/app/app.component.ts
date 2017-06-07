import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selected = 0;
  panels = [{name: 'shelf'}, {name: 'source'}];

  setSelected(index: number) {
    this.selected = index;
  }

  isSelected(index: number) {
    return index === this.selected;
  }
}

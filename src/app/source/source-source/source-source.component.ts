import {Component, Input, OnInit} from '@angular/core';
import {IItem, ISeries, ISource} from '../../entity/source';

@Component({
  selector: 'app-source-source',
  templateUrl: './source-source.component.html',
  styleUrls: ['./source-source.component.css']
})
export class SourceSourceComponent implements OnInit {

  @Input() source: any;
  selectedSeries: ISeries;
  selectedIndex = 0;

  constructor() {
  }

  ngOnInit() {
  }

  activate(list, index) {
    list.update();
    this.selectedIndex = index;
  }

  select(s: IItem) {
    this.selectedSeries = s.toSeries();
  }

}

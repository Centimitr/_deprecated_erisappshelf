import {Component, OnInit} from '@angular/core';
import {SourceService} from '../source.service';
import {ISource} from '../../source/source';

@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.css']
})
export class SourceComponent implements OnInit {

  selectedSource: ISource;

  constructor(public sourceService: SourceService) {
  }

  ngOnInit() {
    this.sourceService.all().forEach(s => s.update())
  }

  select(s: ISource) {
    this.selectedSource = s;
    this.selectedSource.lists[0].update();
  }

}

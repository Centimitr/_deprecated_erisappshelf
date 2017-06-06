import {Component, OnInit} from '@angular/core';
import {SourceService} from '../source.service';

@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.css']
})
export class SourceComponent implements OnInit {

  constructor(public sourceService: SourceService) {
  }

  ngOnInit() {
  }

}

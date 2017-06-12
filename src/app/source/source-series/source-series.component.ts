import {Component, Input, OnChanges, OnInit, Output, EventEmitter} from '@angular/core';
import {DownloadService} from '../../download.service';
import {IBook} from '../../entity/source';

@Component({
  selector: 'app-source-series',
  templateUrl: './source-series.component.html',
  styleUrls: ['./source-series.component.css']
})
export class SourceSeriesComponent implements OnChanges {
  @Output() exit = new EventEmitter<void>();
  @Input() series: any;

  constructor(private downloadService: DownloadService) {
  }

  ngOnChanges(changes) {
    if (changes.series && this.series) {
      this.series.update();
    }
  }

  download(b: IBook) {
    this.downloadService.add(b)
  }

}

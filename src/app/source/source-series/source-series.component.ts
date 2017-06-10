import {Component, Input, OnChanges, OnInit, Output, EventEmitter} from '@angular/core';
import {IBook, ISeries} from '../../entity/source';
import {DownloadService} from '../../download.service';

@Component({
  selector: 'app-source-series',
  templateUrl: './source-series.component.html',
  styleUrls: ['./source-series.component.css']
})
export class SourceSeriesComponent implements OnChanges {
  @Output() exit = new EventEmitter<void>();
  @Input() series: ISeries;

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

import {Component, OnInit} from '@angular/core';
import {DownloadService} from '../download.service';

@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.css']
})
export class ShelfComponent implements OnInit {

  constructor(public downloadService: DownloadService) {
  }

  ngOnInit() {
  }

}

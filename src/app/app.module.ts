import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SourceService} from './source.service';
import {SourceComponent} from './source/source.component';
import {SourceSourceComponent} from './source/source-source/source-source.component';
import {SourceSeriesComponent} from './source/source-series/source-series.component';
import {DownloadService} from './download.service';
import { ShelfComponent } from './shelf/shelf.component';

@NgModule({
  declarations: [
    AppComponent,
    SourceComponent,
    SourceSourceComponent,
    SourceSeriesComponent,
    ShelfComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [SourceService, DownloadService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

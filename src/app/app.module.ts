import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SourceService} from './source.service';
import {SourceComponent} from './source/source.component';
import {SourceSourceComponent} from './source/source-source/source-source.component';
import {SourceSeriesComponent} from './source/source-series/source-series.component';
import {DownloadService} from './download.service';
import {ShelfComponent} from './shelf/shelf.component';
import {AppStorage} from './storage.service';
import {Source1kkk} from '../source/1kkk';

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
  providers: [SourceService, DownloadService, AppStorage, Source1kkk],
  bootstrap: [AppComponent]
})
export class AppModule {
}

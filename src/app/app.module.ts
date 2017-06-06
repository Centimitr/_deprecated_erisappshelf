import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SourceService} from './source.service';
import { SourceComponent } from './source/source.component';

@NgModule({
  declarations: [
    AppComponent,
    SourceComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [SourceService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

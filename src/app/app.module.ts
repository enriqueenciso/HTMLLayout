import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WordShufflerDirective } from './directives/word-shuffler.directive';

@NgModule({
  declarations: [
    AppComponent,
    WordShufflerDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

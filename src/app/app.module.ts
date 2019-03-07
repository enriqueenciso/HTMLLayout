import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WordShufflerDirective } from './directives/word-shuffler.directive';
import { RecentSupportersComponent } from './components/recent-supporters/recent-supporters.component';

@NgModule({
  declarations: [
    AppComponent,
    WordShufflerDirective,
    RecentSupportersComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

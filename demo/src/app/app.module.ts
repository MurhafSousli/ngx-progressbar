import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {NgProgressModule} from "ng2-progressbar";

import {AppComponent} from './app.component';
import {MainComponent} from './main/main.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgProgressModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { NgProgressRouterModule } from 'ngx-progressbar/router';

// import { NgProgressModule } from '../../../ngx-progressbar/src/public-api';
// import { NgProgressHttpModule } from '../../../ngx-progressbar/http/src/public_api';
// import { NgProgressRouterModule } from '../../../ngx-progressbar/router/src/public_api';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './routing.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgProgressModule,
    NgProgressHttpModule,
    NgProgressRouterModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

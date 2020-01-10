import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgProgressModule } from '../../projects/ngx-progressbar/src/public-api';
import { NgProgressHttpModule } from '../../projects/ngx-progressbar/http/src/public_api';
import { NgProgressRouterModule } from '../../projects/ngx-progressbar/router/src/public_api';

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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpClientModule } from '@ngx-progressbar/http-client';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LabComponent } from './lab/lab.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LabComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgProgressModule.forRoot(),
    NgProgressHttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

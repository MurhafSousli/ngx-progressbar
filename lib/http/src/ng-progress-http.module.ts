import { NgModule } from '@angular/core';
import { BrowserXhr } from '@angular/http';
import { NgProgressBrowserXhr } from './ng-progress.xhr';

@NgModule({
  providers: [
    { provide: BrowserXhr, useClass: NgProgressBrowserXhr }
  ],
})
export class NgProgressHttpModule {}

import {Injectable} from '@angular/core';
import {BrowserXhr} from '@angular/http';

import {NgProgressService} from './progress.service';

@Injectable()
export class NgProgressBrowserXhr extends BrowserXhr {

  private currentRequest: number = 0;

  constructor(private service: NgProgressService) {
    super();
  }

  public build() {
    const xhr = super.build();

    xhr.onload = (evt) => this.done();
    xhr.onerror = (evt) => this.done();
    xhr.onabort = (evt) => this.done();

    xhr.onloadstart = (event) => {
      this.currentRequest++;
      if (!this.service.isStarted()) {
        this.service.start();
      }
    };

    return xhr;
  }

  private done() {
    this.currentRequest--;
    if (this.currentRequest === 0) {
      this.service.done();
    }
  }
}

import { Injectable } from '@angular/core';
import { BrowserXhr } from '@angular/http';

import { NgProgress } from './progress.service';

@Injectable()
export class NgProgressBrowserXhr extends BrowserXhr {

  private currentRequest: number = 0;

  constructor(private ngProgress: NgProgress) {
    super();
  }

  public build() {
    const xhr = super.build();

    xhr.onload = (evt) => this.done();
    xhr.onerror = (evt) => this.done();
    xhr.onabort = (evt) => this.done();

    xhr.onloadstart = (event) => {
      this.currentRequest++;
      if (!this.ngProgress.isStarted()) {
        this.ngProgress.start();
      }
    };

    return xhr;
  }

  private done() {
    this.currentRequest--;
    if (this.currentRequest === 0) {
      this.ngProgress.done();
    }
  }
}

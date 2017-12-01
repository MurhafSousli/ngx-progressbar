import { Injectable } from '@angular/core';
import { BrowserXhr } from '@angular/http';
import { NgProgress } from '@ngx-progressbar/core';

@Injectable()
export class NgProgressBrowserXhr extends BrowserXhr {

  private currentRequest = 0;

  constructor(private progress: NgProgress) {
    super();
  }

  public build() {
    const xhr = super.build();

    xhr.onload = (evt) => this.done();
    xhr.onerror = (evt) => this.done();
    xhr.onabort = (evt) => this.done();

    xhr.onloadstart = (event) => {
      this.currentRequest++;
      if (!this.progress.isStarted) {
        this.progress.start();
      }
    };

    return xhr;
  }

  private done() {
    this.currentRequest--;
    if (this.currentRequest === 0) {
      this.progress.done();
    }
  }
}

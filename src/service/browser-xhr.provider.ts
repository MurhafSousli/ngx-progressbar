import { Injectable } from '@angular/core';
import { BrowserXhr } from '@angular/http';

import { NgProgressService } from './progress.service';

@Injectable()
export class NgProgressCustomBrowserXhr extends BrowserXhr {

    currentRequest: number = 0;

    constructor(private service: NgProgressService) {
        super();
    }

    build(): any {
        let xhr = super.build();

        xhr.onload = (evt) => this.done();
        xhr.onerror = (evt) => this.done();
        xhr.onabort = (evt) => this.done();

        xhr.onloadstart = (event) => {
            this.currentRequest++;
            if (!this.service.isStarted()) this.service.start();
            // TODO: do some progress magic here
            // if (event.lengthComputable) {
        };

        // TODO: use event information to compute pending
        // xhr.onprogress = (event) => {};

        return <any>(xhr);
    }

    private done() {
        this.currentRequest--;
        if (this.currentRequest === 0) {
            this.service.done();
        }
    }
}

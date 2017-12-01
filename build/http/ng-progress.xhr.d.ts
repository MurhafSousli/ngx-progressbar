import { BrowserXhr } from '@angular/http';
import { NgProgress } from '@ngx-progressbar/core';
export declare class NgProgressBrowserXhr extends BrowserXhr {
    private progress;
    private currentRequest;
    constructor(progress: NgProgress);
    build(): any;
    private done();
}

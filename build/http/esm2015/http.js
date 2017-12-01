import { Injectable, NgModule } from '@angular/core';
import { BrowserXhr } from '@angular/http';
import { NgProgress } from '@ngx-progressbar/core';

var __decorate$1 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let NgProgressBrowserXhr = class NgProgressBrowserXhr extends BrowserXhr {
    constructor(progress) {
        super();
        this.progress = progress;
        this.currentRequest = 0;
    }
    build() {
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
    done() {
        this.currentRequest--;
        if (this.currentRequest === 0) {
            this.progress.done();
        }
    }
};
NgProgressBrowserXhr = __decorate$1([
    Injectable(),
    __metadata("design:paramtypes", [NgProgress])
], NgProgressBrowserXhr);

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let NgProgressHttpModule = class NgProgressHttpModule {
};
NgProgressHttpModule = __decorate([
    NgModule({
        providers: [
            { provide: BrowserXhr, useClass: NgProgressBrowserXhr }
        ],
    })
], NgProgressHttpModule);

/**
 * Generated bundle index. Do not edit.
 */

export { NgProgressBrowserXhr as ɵa, NgProgressHttpModule };
//# sourceMappingURL=http.js.map

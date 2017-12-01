import { Injectable, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { NgProgress } from '@ngx-progressbar/core';
var __decorate$1 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
        return Reflect.metadata(k, v);
};
var NgProgressInterceptor = (function () {
    function NgProgressInterceptor(progress) {
        this.progress = progress;
    }
    // Ignoring specific requests will be supported after this https://github.com/angular/angular/issues/18155
    NgProgressInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        this.progress.start();
        return next.handle(req).pipe(finalize(function () { return _this.progress.done(); }));
    };
    return NgProgressInterceptor;
}());
NgProgressInterceptor = __decorate$1([
    Injectable(),
    __metadata("design:paramtypes", [NgProgress])
], NgProgressInterceptor);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NgProgressHttpClientModule = (function () {
    function NgProgressHttpClientModule() {
    }
    return NgProgressHttpClientModule;
}());
NgProgressHttpClientModule = __decorate([
    NgModule({
        providers: [
            { provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true }
        ],
    })
], NgProgressHttpClientModule);
/**
 * Generated bundle index. Do not edit.
 */
export { NgProgressInterceptor as ɵa, NgProgressHttpClientModule };
//# sourceMappingURL=http-client.js.map

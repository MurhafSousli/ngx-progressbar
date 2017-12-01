(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common/http'), require('rxjs/operators'), require('@ngx-progressbar/core')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common/http', 'rxjs/operators', '@ngx-progressbar/core'], factory) :
	(factory((global['ngx-progressbar'] = global['ngx-progressbar'] || {}, global['ngx-progressbar']['http-client'] = {}),global.ng.core,global.ng.common.http,global.Rx.Observable.prototype,global['@ngx-progressbar/core']));
}(this, (function (exports,core,http,operators,core$1) { 'use strict';

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
exports.ɵa = (function () {
    function NgProgressInterceptor(progress) {
        this.progress = progress;
    }
    // Ignoring specific requests will be supported after this https://github.com/angular/angular/issues/18155
    NgProgressInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        this.progress.start();
        return next.handle(req).pipe(operators.finalize(function () { return _this.progress.done(); }));
    };
    return NgProgressInterceptor;
}());
exports.ɵa = __decorate$1([
    core.Injectable(),
    __metadata("design:paramtypes", [core$1.NgProgress])
], exports.ɵa);
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
exports.NgProgressHttpClientModule = (function () {
    function NgProgressHttpClientModule() {
    }
    return NgProgressHttpClientModule;
}());
exports.NgProgressHttpClientModule = __decorate([
    core.NgModule({
        providers: [
            { provide: http.HTTP_INTERCEPTORS, useClass: exports.ɵa, multi: true }
        ],
    })
], exports.NgProgressHttpClientModule);

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=http-client.umd.js.map

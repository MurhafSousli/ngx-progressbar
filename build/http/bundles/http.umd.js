(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/http'), require('@ngx-progressbar/core')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/http', '@ngx-progressbar/core'], factory) :
	(factory((global['ngx-progressbar'] = global['ngx-progressbar'] || {}, global['ngx-progressbar'].http = {}),global.ng.core,global.ng.http,global['@ngx-progressbar/core']));
}(this, (function (exports,core,http,core$1) { 'use strict';

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.ɵa = (function (_super) {
    __extends(NgProgressBrowserXhr, _super);
    function NgProgressBrowserXhr(progress) {
        var _this = _super.call(this) || this;
        _this.progress = progress;
        _this.currentRequest = 0;
        return _this;
    }
    NgProgressBrowserXhr.prototype.build = function () {
        var _this = this;
        var xhr = _super.prototype.build.call(this);
        xhr.onload = function (evt) { return _this.done(); };
        xhr.onerror = function (evt) { return _this.done(); };
        xhr.onabort = function (evt) { return _this.done(); };
        xhr.onloadstart = function (event) {
            _this.currentRequest++;
            if (!_this.progress.isStarted) {
                _this.progress.start();
            }
        };
        return xhr;
    };
    NgProgressBrowserXhr.prototype.done = function () {
        this.currentRequest--;
        if (this.currentRequest === 0) {
            this.progress.done();
        }
    };
    return NgProgressBrowserXhr;
}(http.BrowserXhr));
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
exports.NgProgressHttpModule = (function () {
    function NgProgressHttpModule() {
    }
    return NgProgressHttpModule;
}());
exports.NgProgressHttpModule = __decorate([
    core.NgModule({
        providers: [
            { provide: http.BrowserXhr, useClass: exports.ɵa }
        ],
    })
], exports.NgProgressHttpModule);

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=http.umd.js.map

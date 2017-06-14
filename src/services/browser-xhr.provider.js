"use strict";
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var NgProgressBrowserXhr = (function (_super) {
    __extends(NgProgressBrowserXhr, _super);
    function NgProgressBrowserXhr(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
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
            if (!_this.service.isStarted()) {
                _this.service.start();
            }
            // TODO: do some progress magic here
            // if (event.lengthComputable) {
        };
        // TODO: use event information to compute pending
        // xhr.onprogress = (event) => {};
        return xhr;
    };
    NgProgressBrowserXhr.prototype.done = function () {
        this.currentRequest--;
        if (this.currentRequest === 0) {
            this.service.done();
        }
    };
    return NgProgressBrowserXhr;
}(http_1.BrowserXhr));
NgProgressBrowserXhr = __decorate([
    core_1.Injectable()
], NgProgressBrowserXhr);
exports.NgProgressBrowserXhr = NgProgressBrowserXhr;

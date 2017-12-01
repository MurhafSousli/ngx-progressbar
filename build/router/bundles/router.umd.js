(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/router'), require('@ngx-progressbar/core')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/router', '@ngx-progressbar/core'], factory) :
	(factory((global['ngx-progressbar'] = global['ngx-progressbar'] || {}, global['ngx-progressbar'].router = {}),global.ng.core,global.ng.router,global['@ngx-progressbar/core']));
}(this, (function (exports,core,router,core$1) { 'use strict';

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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
        return Reflect.metadata(k, v);
};
exports.NgProgressRouterModule = (function () {
    function NgProgressRouterModule(router$$1, progress) {
        router$$1.events.subscribe(function (event) {
            if (event instanceof router.NavigationStart) {
                progress.start();
            }
            if (event instanceof router.NavigationEnd || event instanceof router.NavigationCancel || event instanceof router.NavigationError) {
                progress.done();
            }
        });
    }
    return NgProgressRouterModule;
}());
exports.NgProgressRouterModule = __decorate([
    core.NgModule({}),
    __metadata("design:paramtypes", [router.Router, core$1.NgProgress])
], exports.NgProgressRouterModule);

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=router.umd.js.map

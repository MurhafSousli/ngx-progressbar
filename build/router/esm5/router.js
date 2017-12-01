import { NgModule } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { NgProgress } from '@ngx-progressbar/core';
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
var NgProgressRouterModule = (function () {
    function NgProgressRouterModule(router$$1, progress) {
        router$$1.events.subscribe(function (event) {
            if (event instanceof NavigationStart) {
                progress.start();
            }
            if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
                progress.done();
            }
        });
    }
    return NgProgressRouterModule;
}());
NgProgressRouterModule = __decorate([
    NgModule({}),
    __metadata("design:paramtypes", [Router, NgProgress])
], NgProgressRouterModule);
/**
 * Generated bundle index. Do not edit.
 */
export { NgProgressRouterModule };
//# sourceMappingURL=router.js.map

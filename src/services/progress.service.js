"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/timer");
require("rxjs/add/operator/switchMap");
require("rxjs/add/operator/do");
require("rxjs/add/operator/takeWhile");
/** Helper */
var clamp = function (n, min, max) {
    if (n < min) {
        return min;
    }
    if (n > max) {
        return max;
    }
    return n;
};
var NgProgressService = (function () {
    function NgProgressService() {
        var _this = this;
        /** Progress state */
        this.state = new Subject_1.Subject();
        /** Trickling stream */
        this.trickling = new Subject_1.Subject();
        this.progress = 0;
        this.maximum = 1;
        this.minimum = 0.08;
        this.speed = 200;
        this.trickleSpeed = 300;
        this.trickling.switchMap(function () {
            return Observable_1.Observable
                .timer(0, _this.trickleSpeed)
                .takeWhile(function () { return _this.isStarted(); })["do"](function () { return _this.inc(); });
        }).subscribe();
    }
    /** Start */
    NgProgressService.prototype.start = function () {
        if (!this.isStarted()) {
            this.set(this.minimum);
        }
        this.trickling.next();
    };
    /** Done */
    NgProgressService.prototype.done = function () {
        /** if started complete the progress */
        if (this.isStarted()) {
            this.set(.3 + .5 * Math.random());
            this.set(this.maximum);
        }
    };
    /** Increment Progress */
    NgProgressService.prototype.inc = function (amount) {
        var n = this.progress;
        /** if it hasn't start, start */
        if (!this.isStarted()) {
            this.start();
        }
        else {
            if (typeof amount !== 'number') {
                if (n >= 0 && n < 0.2) {
                    amount = 0.1;
                }
                else if (n >= 0.2 && n < 0.5) {
                    amount = 0.04;
                }
                else if (n >= 0.5 && n < 0.8) {
                    amount = 0.02;
                }
                else if (n >= 0.8 && n < 0.99) {
                    amount = 0.005;
                }
                else {
                    amount = 0;
                }
            }
            n = clamp(n + amount, 0, 0.994);
            this.set(n);
        }
    };
    /** Set progress state */
    NgProgressService.prototype.set = function (n) {
        var _this = this;
        this.progress = clamp(n, this.minimum, this.maximum);
        this.updateState(this.progress, true);
        /** if progress completed */
        if (n === this.maximum) {
            var hide_1 = function () {
                /**
                 *  reset progress
                 *  Keep it { 0, false } to fadeOut progress-bar after complete
                 */
                _this.progress = 0;
                _this.updateState(_this.progress, false);
            };
            var complete = function () {
                /**
                 * complete progressbar
                 * { 1, false } to complete progress-bar before hiding
                 */
                _this.updateState(_this.progress, false);
                setTimeout(hide_1, _this.speed);
            };
            setTimeout(complete, this.speed);
        }
    };
    /**
     * Is progress started
     * @return {boolean}
     */
    NgProgressService.prototype.isStarted = function () {
        return this.progress > 0 && this.progress < this.maximum;
    };
    /** Update Progressbar State */
    NgProgressService.prototype.updateState = function (progress, isActive) {
        this.state.next({
            active: isActive,
            value: progress
        });
    };
    return NgProgressService;
}());
NgProgressService = __decorate([
    core_1.Injectable()
], NgProgressService);
exports.NgProgressService = NgProgressService;

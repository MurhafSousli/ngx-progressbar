import { ChangeDetectionStrategy, Component, Injectable, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject as Subject$1 } from 'rxjs/Subject';
import { BehaviorSubject as BehaviorSubject$1 } from 'rxjs/BehaviorSubject';
import { timer as timer$1 } from 'rxjs/observable/timer';
import { distinctUntilChanged, filter, map, skip, switchMap, takeWhile, tap } from 'rxjs/operators';
import { of as of$1 } from 'rxjs/observable/of';
var __decorate$2 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$1 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
        return Reflect.metadata(k, v);
};
/**
 * Keep value within the range
 */
var clamp = function (n, min, max) {
    if (n < min) {
        return min;
    }
    if (n > max) {
        return max;
    }
    return n;
};
var ɵ0$1 = clamp;
var NgProgress = (function () {
    function NgProgress() {
        var _this = this;
        /** Initial state */
        this.initState = {
            active: false,
            value: 0
        };
        /** Progress state */
        this.state$ = new BehaviorSubject$1(this.initState);
        /** Trickling stream */
        this.trickling$ = new Subject$1();
        this.progress = 0;
        this.maximum = 1;
        this.minimum = 0.08;
        this.speed = 200;
        this.trickleSpeed = 300;
        this.trickling$.pipe(switchMap(function () { return timer$1(0, _this.trickleSpeed).pipe(takeWhile(function () { return _this.isStarted; }), tap(function () { return _this.inc(); })); })).subscribe();
    }
    Object.defineProperty(NgProgress.prototype, "isStarted", {
        /** Is progress started */
        get: function () {
            return this.progress > 0 && this.progress < this.maximum;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgProgress.prototype, "started", {
        /** Progress start event */
        get: function () {
            return this.state$.pipe(map(function (state) { return state.active; }), distinctUntilChanged(), filter(function (active) { return active; }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgProgress.prototype, "ended", {
        /** Progress ended event */
        get: function () {
            return this.state$.pipe(map(function (state) { return state.active; }), distinctUntilChanged(), filter(function (active) { return !active; }), skip(1));
        },
        enumerable: true,
        configurable: true
    });
    /** Start */
    NgProgress.prototype.start = function () {
        if (!this.isStarted) {
            this.set(this.minimum);
        }
        this.trickling$.next();
    };
    /** Done */
    NgProgress.prototype.done = function () {
        /** if started, complete the progress */
        if (this.isStarted) {
            this.set(.3 + .5 * Math.random());
            this.set(this.maximum);
        }
    };
    /**
     * Increment the progress
     * @param {number} amount
     */
    NgProgress.prototype.inc = function (amount) {
        var n = this.progress;
        /** if it hasn't start, start */
        if (!this.isStarted) {
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
    /**
     * Set the progress
     * @param {number} n - Progress value
     */
    NgProgress.prototype.set = function (n) {
        var _this = this;
        this.progress = clamp(n, this.minimum, this.maximum);
        this.updateState(this.progress, true);
        /** if progress completed */
        if (n === this.maximum) {
            var hide_1 = function () {
                /**
                 *  reset the progress
                 *  Keep it { 0, false } to fadeOut progress-bar after complete
                 */
                if (_this.progress >= _this.maximum) {
                    _this.progress = 0;
                    _this.updateState(_this.progress, false);
                }
            };
            var complete = function () {
                /**
                 * complete the progress
                 * { 1, false } to complete progress-bar before hiding
                 */
                if (_this.progress >= _this.maximum) {
                    _this.updateState(_this.progress, false);
                    setTimeout(hide_1, _this.speed);
                }
            };
            setTimeout(complete, this.speed);
        }
    };
    /**
     * Update progress state
     * @param {number} progress - Progress value
     * @param {boolean} isActive - Progress active
     */
    NgProgress.prototype.updateState = function (progress, isActive) {
        this.state$.next({
            active: isActive,
            value: progress
        });
    };
    return NgProgress;
}());
NgProgress = __decorate$2([
    Injectable(),
    __metadata$1("design:paramtypes", [])
], NgProgress);
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
var NgProgressBarComponent = (function () {
    function NgProgressBarComponent(progress) {
        this.progress = progress;
    }
    NgProgressBarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.state$ = this.progress.state$.pipe(switchMap(function (state) {
            return of$1({
                containerClasses: _this.containerClasses(state),
                progressStyles: _this.progressBarStyles(state),
                meteorStyles: _this.meteorStyles(),
                spinnerClasses: _this.spinnerClasses(),
                spinnerStyles: _this.spinnerStyles()
            });
        }));
    };
    NgProgressBarComponent.prototype.containerClasses = function (state) {
        return {
            active: state.active,
            thick: this.thick
        };
    };
    NgProgressBarComponent.prototype.progressBarStyles = function (state) {
        var n = (!state.value) ? directionSwitcher[this.direction].bar : this.toPercentage(state.value);
        return {
            transition: "all " + this.speed + "ms " + this.ease,
            background: this.color,
            mozTransform: translateX(n),
            oTransform: translateX(n),
            msTransform: translateX(n),
            webkitTransform: translateX(n),
            transform: translateX(n)
        };
    };
    /**
     * Styles for progressbar tail
     */
    NgProgressBarComponent.prototype.meteorStyles = function () {
        return {
            boxShadow: "0 0 10px " + this.color + ", 0 0 5px " + this.color,
            left: directionSwitcher[this.direction].meteorLeft,
            transform: directionSwitcher[this.direction].meteorRotate(this.thick),
        };
    };
    /**
     * Convert number to percent
     * @param {number} n - State value
     */
    NgProgressBarComponent.prototype.toPercentage = function (n) {
        return directionSwitcher[this.direction].toPercentage(n) * 100;
    };
    /**
     * Progress direction
     */
    NgProgressBarComponent.prototype.spinnerClasses = function () {
        var spinnerClass = (this.spinnerPosition === 'left') ? ' spinner-left' : '';
        return directionSwitcher[this.direction].spinnerClass + spinnerClass;
    };
    /**
     * Set spinner color
     */
    NgProgressBarComponent.prototype.spinnerStyles = function () {
        return {
            borderTopColor: this.color,
            borderLeftColor: this.color
        };
    };
    return NgProgressBarComponent;
}());
__decorate$1([
    Input(),
    __metadata("design:type", String)
], NgProgressBarComponent.prototype, "ease", void 0);
__decorate$1([
    Input(),
    __metadata("design:type", Number)
], NgProgressBarComponent.prototype, "speed", void 0);
__decorate$1([
    Input(),
    __metadata("design:type", Boolean)
], NgProgressBarComponent.prototype, "meteor", void 0);
__decorate$1([
    Input(),
    __metadata("design:type", Boolean)
], NgProgressBarComponent.prototype, "spinner", void 0);
__decorate$1([
    Input(),
    __metadata("design:type", String)
], NgProgressBarComponent.prototype, "spinnerPosition", void 0);
__decorate$1([
    Input(),
    __metadata("design:type", String)
], NgProgressBarComponent.prototype, "direction", void 0);
__decorate$1([
    Input(),
    __metadata("design:type", String)
], NgProgressBarComponent.prototype, "thick", void 0);
__decorate$1([
    Input(),
    __metadata("design:type", String)
], NgProgressBarComponent.prototype, "color", void 0);
NgProgressBarComponent = __decorate$1([
    Component({
        selector: 'ng-progress-bar',
        template: "\n    <div class=\"ng-progress\" *ngIf=\"state$ | async; let state\" [ngClass]=\"state.containerClasses\">\n\n      <div class=\"bar\" [ngStyle]=\"state.progressStyles\">\n\n        <div *ngIf=\"meteor\" class=\"meteor\" [ngStyle]=\"state.meteorStyles\"></div>\n\n      </div>\n\n      <div *ngIf=\"spinner\" class=\"spinner {{state.spinnerClasses}}\">\n\n        <div class=\"spinner-icon\" [ngStyle]=\"state.spinnerStyles\"></div>\n\n      </div> \n    </div>\n  ",
        styles: ["\n    .ng-progress {\n      z-index: 999999;\n      top: 0;\n      left: 0;\n      width: 100%;\n      position: fixed;\n      zoom: 1;\n      filter: alpha(opacity=0);\n      opacity: 0;\n      -webkit-transition: opacity 200ms linear;\n      transition: opacity 200ms linear; }\n\n    .active {\n      filter: alpha(opacity=100);\n      opacity: 1;\n      -webkit-transition: none;\n      transition: none; }\n\n    .bar {\n      position: absolute;\n      width: 100%;\n      height: 2px; }\n\n    .thick .bar {\n      height: 3px; }\n\n    .meteor {\n      display: block;\n      position: absolute;\n      right: 0;\n      top: -3px;\n      width: 100px;\n      height: 100%;\n      opacity: 1.0; }\n\n    .thick .meteor {\n      top: -4px; }\n\n    .thick .spinner-icon {\n      width: 24px;\n      height: 24px;\n      border: solid 3px transparent; }\n\n    .spinner {\n      display: block;\n      position: fixed;\n      z-index: 1031;\n      top: 15px;\n      right: 15px; }\n      .spinner.spinner-left {\n        left: 15px;\n        right: unset; }\n\n    .spinner-icon {\n      width: 18px;\n      height: 18px;\n      -webkit-box-sizing: border-box;\n              box-sizing: border-box;\n      border: solid 2px transparent;\n      border-radius: 50%;\n      -webkit-animation: nprogress-spinner 400ms linear infinite;\n              animation: nprogress-spinner 400ms linear infinite; }\n\n    .anti-clockwise .spinner-icon {\n      -webkit-animation-direction: reverse;\n              animation-direction: reverse; }\n\n    @-webkit-keyframes nprogress-spinner {\n      0% {\n        -webkit-transform: rotate(0deg);\n                transform: rotate(0deg); }\n      100% {\n        -webkit-transform: rotate(360deg);\n                transform: rotate(360deg); } }\n\n    @keyframes nprogress-spinner {\n      0% {\n        -webkit-transform: rotate(0deg);\n                transform: rotate(0deg); }\n      100% {\n        -webkit-transform: rotate(360deg);\n                transform: rotate(360deg); } }\n  "],
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [NgProgress])
], NgProgressBarComponent);
var translateX = function (n) {
    return "translate3d(" + n + "%,0,0)";
};
var ɵ1 = function (n) { return -1 + n; };
var ɵ2 = function (thick) { return "rotate(" + (thick ? 4 : 3) + "deg)"; };
var ɵ3 = function (n) { return -n; };
var ɵ4 = function (thick) { return "rotate(" + (thick ? 4 : 3) + "deg)"; };
var ɵ5 = function (n) { return 1 - n; };
var ɵ6 = function (thick) { return "rotate(" + (thick ? -4 : -3) + "deg)"; };
var ɵ7 = function (n) { return n; };
var ɵ8 = function (thick) { return "rotate(" + (thick ? -4 : -3) + "deg)"; };
var directionSwitcher = {
    leftToRightIncreased: {
        bar: -100,
        toPercentage: ɵ1,
        spinnerClass: 'clockwise',
        meteorRotate: ɵ2,
        meteorLeft: 'unset'
    },
    leftToRightReduced: {
        bar: 0,
        toPercentage: ɵ3,
        spinnerClass: 'anti-clockwise',
        meteorRotate: ɵ4,
        meteorLeft: 'unset'
    },
    rightToLeftIncreased: {
        bar: 100,
        toPercentage: ɵ5,
        spinnerClass: 'anti-clockwise',
        meteorRotate: ɵ6,
        meteorLeft: 0
    },
    rightToLeftReduced: {
        bar: 0,
        toPercentage: ɵ7,
        spinnerClass: 'clockwise',
        meteorRotate: ɵ8,
        meteorLeft: 0
    }
};
var __decorate$3 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$2 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
        return Reflect.metadata(k, v);
};
var NgProgressComponent = (function () {
    function NgProgressComponent(progress) {
        this.progress = progress;
        /** Progress options  */
        this.ease = 'linear';
        this.meteor = true;
        this.spinner = true;
        this.spinnerPosition = 'right';
        this.direction = 'leftToRightIncreased';
        this.color = '#1B95E0';
        this.thick = false;
        this.maximum = 1;
        this.minimum = 0.08;
        this.speed = 200;
        this.trickleSpeed = 300;
    }
    Object.defineProperty(NgProgressComponent.prototype, "toggleProgressbar", {
        /** Start/Stop Progressbar */
        set: function (toggle) {
            toggle ? this.progress.start() : this.progress.done();
        },
        enumerable: true,
        configurable: true
    });
    NgProgressComponent.prototype.ngOnChanges = function (changes) {
        var minChng = changes.minimum;
        var maxChng = changes.maximum;
        var spdChng = changes.speed;
        var tklSpdChng = changes.trickleSpeed;
        if (minChng) {
            if (typeof minChng.currentValue !== 'undefined' && minChng.currentValue !== minChng.previousValue) {
                if (minChng.currentValue < 0 || minChng.currentValue > 1) {
                    throw new Error('Input [minimum] must be between 0 and 1');
                }
                else {
                    this.progress.minimum = minChng.currentValue;
                }
            }
        }
        if (maxChng) {
            if (typeof maxChng.currentValue !== 'undefined' && maxChng.currentValue !== maxChng.previousValue) {
                if (maxChng.currentValue < 0 || maxChng.currentValue > 1) {
                    throw new Error('Input [maximum] must be between 0 and 1');
                }
                else {
                    this.progress.maximum = maxChng.currentValue;
                }
            }
        }
        if (spdChng) {
            if (typeof spdChng.currentValue !== 'undefined' && spdChng.currentValue !== spdChng.previousValue) {
                this.progress.speed = spdChng.currentValue;
            }
        }
        if (tklSpdChng) {
            if (typeof tklSpdChng.currentValue !== 'undefined' && tklSpdChng.currentValue !== tklSpdChng.previousValue) {
                this.progress.trickleSpeed = tklSpdChng.currentValue;
            }
        }
    };
    return NgProgressComponent;
}());
__decorate$3([
    Input(),
    __metadata$2("design:type", Object)
], NgProgressComponent.prototype, "ease", void 0);
__decorate$3([
    Input(),
    __metadata$2("design:type", Object)
], NgProgressComponent.prototype, "meteor", void 0);
__decorate$3([
    Input(),
    __metadata$2("design:type", Object)
], NgProgressComponent.prototype, "spinner", void 0);
__decorate$3([
    Input(),
    __metadata$2("design:type", Object)
], NgProgressComponent.prototype, "spinnerPosition", void 0);
__decorate$3([
    Input(),
    __metadata$2("design:type", Object)
], NgProgressComponent.prototype, "direction", void 0);
__decorate$3([
    Input(),
    __metadata$2("design:type", Object)
], NgProgressComponent.prototype, "color", void 0);
__decorate$3([
    Input(),
    __metadata$2("design:type", Object)
], NgProgressComponent.prototype, "thick", void 0);
__decorate$3([
    Input(),
    __metadata$2("design:type", Object)
], NgProgressComponent.prototype, "maximum", void 0);
__decorate$3([
    Input(),
    __metadata$2("design:type", Object)
], NgProgressComponent.prototype, "minimum", void 0);
__decorate$3([
    Input(),
    __metadata$2("design:type", Object)
], NgProgressComponent.prototype, "speed", void 0);
__decorate$3([
    Input(),
    __metadata$2("design:type", Object)
], NgProgressComponent.prototype, "trickleSpeed", void 0);
__decorate$3([
    Input('toggle'),
    __metadata$2("design:type", Boolean),
    __metadata$2("design:paramtypes", [Boolean])
], NgProgressComponent.prototype, "toggleProgressbar", null);
NgProgressComponent = __decorate$3([
    Component({
        selector: 'ng-progress',
        template: "\n    <ng-progress-bar\n        [speed]=\"speed\"\n        [ease]=\"ease\"\n        [meteor]=\"meteor\"\n        [spinner]=\"spinner\"\n        [spinnerPosition]=\"spinnerPosition\"\n        [direction]=\"direction\"\n        [color]=\"color\"\n        [thick]=\"thick\"\n    ></ng-progress-bar>\n  ",
        styles: ["\n    :host {\n      z-index: 999999;\n      pointer-events: none;\n      position: relative; }\n  "],
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    __metadata$2("design:paramtypes", [NgProgress])
], NgProgressComponent);
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
var NgProgressModule = NgProgressModule_1 = (function () {
    function NgProgressModule() {
    }
    NgProgressModule.forRoot = function () {
        return {
            ngModule: NgProgressModule_1,
            providers: [NgProgress],
        };
    };
    return NgProgressModule;
}());
NgProgressModule = NgProgressModule_1 = __decorate([
    NgModule({
        declarations: [
            NgProgressComponent,
            NgProgressBarComponent
        ],
        exports: [
            NgProgressComponent
        ],
        imports: [
            CommonModule
        ]
    })
], NgProgressModule);
var NgProgressModule_1;
/**
 * Generated bundle index. Do not edit.
 */
export { NgProgressModule, NgProgress, ɵ0$1 as ɵ0 };
//# sourceMappingURL=core.js.map

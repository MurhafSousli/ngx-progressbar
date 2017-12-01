import { ChangeDetectionStrategy, Component, Injectable, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject as Subject$1 } from 'rxjs/Subject';
import { BehaviorSubject as BehaviorSubject$1 } from 'rxjs/BehaviorSubject';
import { timer as timer$1 } from 'rxjs/observable/timer';
import { distinctUntilChanged, filter, map, skip, switchMap, takeWhile, tap } from 'rxjs/operators';
import { of as of$1 } from 'rxjs/observable/of';

var __decorate$2 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$1 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Keep value within the range
 */
const clamp = (n, min, max) => {
    if (n < min) {
        return min;
    }
    if (n > max) {
        return max;
    }
    return n;
};
const ɵ0$1 = clamp;
let NgProgress = class NgProgress {
    constructor() {
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
        this.trickling$.pipe(switchMap(() => timer$1(0, this.trickleSpeed).pipe(takeWhile(() => this.isStarted), tap(() => this.inc())))).subscribe();
    }
    /** Is progress started */
    get isStarted() {
        return this.progress > 0 && this.progress < this.maximum;
    }
    /** Progress start event */
    get started() {
        return this.state$.pipe(map((state) => state.active), distinctUntilChanged(), filter(active => active));
    }
    /** Progress ended event */
    get ended() {
        return this.state$.pipe(map((state) => state.active), distinctUntilChanged(), filter(active => !active), skip(1));
    }
    /** Start */
    start() {
        if (!this.isStarted) {
            this.set(this.minimum);
        }
        this.trickling$.next();
    }
    /** Done */
    done() {
        /** if started, complete the progress */
        if (this.isStarted) {
            this.set(.3 + .5 * Math.random());
            this.set(this.maximum);
        }
    }
    /**
     * Increment the progress
     * @param {number} amount
     */
    inc(amount) {
        let n = this.progress;
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
    }
    /**
     * Set the progress
     * @param {number} n - Progress value
     */
    set(n) {
        this.progress = clamp(n, this.minimum, this.maximum);
        this.updateState(this.progress, true);
        /** if progress completed */
        if (n === this.maximum) {
            const hide = () => {
                /**
                 *  reset the progress
                 *  Keep it { 0, false } to fadeOut progress-bar after complete
                 */
                if (this.progress >= this.maximum) {
                    this.progress = 0;
                    this.updateState(this.progress, false);
                }
            };
            const complete = () => {
                /**
                 * complete the progress
                 * { 1, false } to complete progress-bar before hiding
                 */
                if (this.progress >= this.maximum) {
                    this.updateState(this.progress, false);
                    setTimeout(hide, this.speed);
                }
            };
            setTimeout(complete, this.speed);
        }
    }
    /**
     * Update progress state
     * @param {number} progress - Progress value
     * @param {boolean} isActive - Progress active
     */
    updateState(progress, isActive) {
        this.state$.next({
            active: isActive,
            value: progress
        });
    }
};
NgProgress = __decorate$2([
    Injectable(),
    __metadata$1("design:paramtypes", [])
], NgProgress);

var __decorate$1 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let NgProgressBarComponent = class NgProgressBarComponent {
    constructor(progress) {
        this.progress = progress;
    }
    ngOnInit() {
        this.state$ = this.progress.state$.pipe(switchMap((state) => {
            return of$1({
                containerClasses: this.containerClasses(state),
                progressStyles: this.progressBarStyles(state),
                meteorStyles: this.meteorStyles(),
                spinnerClasses: this.spinnerClasses(),
                spinnerStyles: this.spinnerStyles()
            });
        }));
    }
    containerClasses(state) {
        return {
            active: state.active,
            thick: this.thick
        };
    }
    progressBarStyles(state) {
        const n = (!state.value) ? directionSwitcher[this.direction].bar : this.toPercentage(state.value);
        return {
            transition: `all ${this.speed}ms ${this.ease}`,
            background: this.color,
            mozTransform: translateX(n),
            oTransform: translateX(n),
            msTransform: translateX(n),
            webkitTransform: translateX(n),
            transform: translateX(n)
        };
    }
    /**
     * Styles for progressbar tail
     */
    meteorStyles() {
        return {
            boxShadow: `0 0 10px ${this.color}, 0 0 5px ${this.color}`,
            left: directionSwitcher[this.direction].meteorLeft,
            transform: directionSwitcher[this.direction].meteorRotate(this.thick),
        };
    }
    /**
     * Convert number to percent
     * @param {number} n - State value
     */
    toPercentage(n) {
        return directionSwitcher[this.direction].toPercentage(n) * 100;
    }
    /**
     * Progress direction
     */
    spinnerClasses() {
        const spinnerClass = (this.spinnerPosition === 'left') ? ' spinner-left' : '';
        return directionSwitcher[this.direction].spinnerClass + spinnerClass;
    }
    /**
     * Set spinner color
     */
    spinnerStyles() {
        return {
            borderTopColor: this.color,
            borderLeftColor: this.color
        };
    }
};
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
        template: `
    <div class="ng-progress" *ngIf="state$ | async; let state" [ngClass]="state.containerClasses">

      <div class="bar" [ngStyle]="state.progressStyles">

        <div *ngIf="meteor" class="meteor" [ngStyle]="state.meteorStyles"></div>

      </div>

      <div *ngIf="spinner" class="spinner {{state.spinnerClasses}}">

        <div class="spinner-icon" [ngStyle]="state.spinnerStyles"></div>

      </div> 
    </div>
  `,
        styles: [`
    .ng-progress {
      z-index: 999999;
      top: 0;
      left: 0;
      width: 100%;
      position: fixed;
      zoom: 1;
      filter: alpha(opacity=0);
      opacity: 0;
      -webkit-transition: opacity 200ms linear;
      transition: opacity 200ms linear; }

    .active {
      filter: alpha(opacity=100);
      opacity: 1;
      -webkit-transition: none;
      transition: none; }

    .bar {
      position: absolute;
      width: 100%;
      height: 2px; }

    .thick .bar {
      height: 3px; }

    .meteor {
      display: block;
      position: absolute;
      right: 0;
      top: -3px;
      width: 100px;
      height: 100%;
      opacity: 1.0; }

    .thick .meteor {
      top: -4px; }

    .thick .spinner-icon {
      width: 24px;
      height: 24px;
      border: solid 3px transparent; }

    .spinner {
      display: block;
      position: fixed;
      z-index: 1031;
      top: 15px;
      right: 15px; }
      .spinner.spinner-left {
        left: 15px;
        right: unset; }

    .spinner-icon {
      width: 18px;
      height: 18px;
      -webkit-box-sizing: border-box;
              box-sizing: border-box;
      border: solid 2px transparent;
      border-radius: 50%;
      -webkit-animation: nprogress-spinner 400ms linear infinite;
              animation: nprogress-spinner 400ms linear infinite; }

    .anti-clockwise .spinner-icon {
      -webkit-animation-direction: reverse;
              animation-direction: reverse; }

    @-webkit-keyframes nprogress-spinner {
      0% {
        -webkit-transform: rotate(0deg);
                transform: rotate(0deg); }
      100% {
        -webkit-transform: rotate(360deg);
                transform: rotate(360deg); } }

    @keyframes nprogress-spinner {
      0% {
        -webkit-transform: rotate(0deg);
                transform: rotate(0deg); }
      100% {
        -webkit-transform: rotate(360deg);
                transform: rotate(360deg); } }
  `],
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [NgProgress])
], NgProgressBarComponent);
const translateX = (n) => {
    return `translate3d(${n}%,0,0)`;
};
const ɵ1 = n => -1 + n;
const ɵ2 = thick => `rotate(${thick ? 4 : 3}deg)`;
const ɵ3 = n => -n;
const ɵ4 = thick => `rotate(${thick ? 4 : 3}deg)`;
const ɵ5 = n => 1 - n;
const ɵ6 = thick => `rotate(${thick ? -4 : -3}deg)`;
const ɵ7 = (n) => n;
const ɵ8 = thick => `rotate(${thick ? -4 : -3}deg)`;
const directionSwitcher = {
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
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$2 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let NgProgressComponent = class NgProgressComponent {
    constructor(progress) {
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
    /** Start/Stop Progressbar */
    set toggleProgressbar(toggle) {
        toggle ? this.progress.start() : this.progress.done();
    }
    ngOnChanges(changes) {
        const minChng = changes.minimum;
        const maxChng = changes.maximum;
        const spdChng = changes.speed;
        const tklSpdChng = changes.trickleSpeed;
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
    }
};
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
        template: `
    <ng-progress-bar
        [speed]="speed"
        [ease]="ease"
        [meteor]="meteor"
        [spinner]="spinner"
        [spinnerPosition]="spinnerPosition"
        [direction]="direction"
        [color]="color"
        [thick]="thick"
    ></ng-progress-bar>
  `,
        styles: [`
    :host {
      z-index: 999999;
      pointer-events: none;
      position: relative; }
  `],
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    __metadata$2("design:paramtypes", [NgProgress])
], NgProgressComponent);

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let NgProgressModule = NgProgressModule_1 = class NgProgressModule {
    static forRoot() {
        return {
            ngModule: NgProgressModule_1,
            providers: [NgProgress],
        };
    }
};
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

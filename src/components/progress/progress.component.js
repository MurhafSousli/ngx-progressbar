"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var ProgressComponent = (function () {
    function ProgressComponent(progress) {
        this.progress = progress;
        /** Progress options  */
        this.ease = 'linear';
        this.positionUsing = 'margin';
        this.showSpinner = true;
        this.direction = 'leftToRightIncreased';
        this.color = '#CC181E';
        this.thick = false;
        this.maximum = 1;
        this.minimum = 0.08;
        this.speed = 200;
        this.trickleSpeed = 300;
    }
    ProgressComponent.prototype.ngOnChanges = function (changes) {
        var minChng = changes['minimum'];
        var maxChng = changes['maximum'];
        var spdChng = changes['speed'];
        var tklSpdChng = changes['trickleSpeed'];
        var tglChng = changes['toggle'];
        if (minChng) {
            if (typeof minChng.currentValue !== 'undefined' && minChng.currentValue !== minChng.previousValue) {
                if (minChng.currentValue < 0 || minChng.currentValue > 1) {
                    throw 'Input [minimum] must be between 0 and 1';
                }
                else {
                    this.progress.minimum = minChng.currentValue;
                }
            }
        }
        if (maxChng) {
            if (typeof maxChng.currentValue !== 'undefined' && maxChng.currentValue !== maxChng.previousValue) {
                if (maxChng.currentValue < 0 || maxChng.currentValue > 1) {
                    throw 'Input [maximum] must be between 0 and 1';
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
        if (tglChng) {
            if (typeof tglChng.currentValue !== 'undefined' && tglChng.currentValue !== tglChng.previousValue) {
                if (tglChng.currentValue) {
                    this.progress.start();
                }
                else {
                    this.progress.done();
                }
            }
        }
    };
    ProgressComponent.prototype.ngOnDestroy = function () {
        this.progress.state.unsubscribe();
        this.progress.trickling.unsubscribe();
    };
    return ProgressComponent;
}());
__decorate([
    core_1.Input()
], ProgressComponent.prototype, "ease");
__decorate([
    core_1.Input()
], ProgressComponent.prototype, "positionUsing");
__decorate([
    core_1.Input()
], ProgressComponent.prototype, "showSpinner");
__decorate([
    core_1.Input()
], ProgressComponent.prototype, "direction");
__decorate([
    core_1.Input()
], ProgressComponent.prototype, "color");
__decorate([
    core_1.Input()
], ProgressComponent.prototype, "thick");
__decorate([
    core_1.Input()
], ProgressComponent.prototype, "maximum");
__decorate([
    core_1.Input()
], ProgressComponent.prototype, "minimum");
__decorate([
    core_1.Input()
], ProgressComponent.prototype, "speed");
__decorate([
    core_1.Input()
], ProgressComponent.prototype, "trickleSpeed");
__decorate([
    core_1.Input()
], ProgressComponent.prototype, "toggle");
ProgressComponent = __decorate([
    core_1.Component({
        selector: 'ng-progress',
        templateUrl: 'progress.component.html',
        styleUrls: ['progress.component.scss'],
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    })
], ProgressComponent);
exports.ProgressComponent = ProgressComponent;

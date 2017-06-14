"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var ProgressBarComponent = (function () {
    function ProgressBarComponent() {
    }
    /** Styles for progressbar */
    ProgressBarComponent.prototype.barStyles = function () {
        var styles = {
            transition: "all " + this.speed + "ms " + this.ease,
            backgroundColor: this.color
        };
        /** Get positioning value */
        var n = (!this.state.value) ? {
            leftToRightIncreased: -100,
            leftToRightReduced: 0,
            rightToLeftIncreased: 100,
            rightToLeftReduced: 0
        }[this.direction] : this.toPercentage(this.state.value);
        switch (this.positionUsing) {
            case 'translate3d':
                styles = Object.assign({}, styles, {
                    transform: "translate3d(" + n + "%,0,0)",
                    '-webkit-transform': "translate3d(" + n + "%,0,0)",
                    '-moz-transform': "translate3d(" + n + "%,0,0)",
                    '-o-transform': "translate3d(" + n + "%,0,0)",
                    '-ms-transform': "translate3d(" + n + "%,0,0)"
                });
                break;
            case 'translate':
                styles = Object.assign({}, styles, {
                    transform: "translate(" + n + "%,0)",
                    '-webkit-transform': "translate(" + n + "%,0)",
                    '-moz-transform': "translate(" + n + "%,0)",
                    '-o-transform': "translate(" + n + "%,0)",
                    '-ms-transform': "translate(" + n + "%,0)"
                });
                break;
            default:
                styles = Object.assign({}, styles, {
                    marginLeft: n + "%"
                });
        }
        return styles;
    };
    /** Styles for progressbar tail */
    ProgressBarComponent.prototype.shadowStyles = function () {
        return {
            boxShadow: "0 0 10px " + this.color + ", 0 0 5px " + this.color
        };
    };
    ProgressBarComponent.prototype.toPercentage = function (n) {
        return ({
            leftToRightIncreased: -1 + n,
            leftToRightReduced: -n,
            rightToLeftIncreased: 1 - n,
            rightToLeftReduced: n
        }[this.direction]) * 100;
    };
    ProgressBarComponent.prototype.spinnerClasses = function () {
        return {
            leftToRightIncreased: 'clockwise',
            leftToRightReduced: 'anti-clockwise',
            rightToLeftIncreased: 'anti-clockwise',
            rightToLeftReduced: 'clockwise'
        }[this.direction];
    };
    return ProgressBarComponent;
}());
__decorate([
    core_1.Input()
], ProgressBarComponent.prototype, "state");
__decorate([
    core_1.Input()
], ProgressBarComponent.prototype, "positionUsing");
__decorate([
    core_1.Input()
], ProgressBarComponent.prototype, "ease");
__decorate([
    core_1.Input()
], ProgressBarComponent.prototype, "speed");
__decorate([
    core_1.Input()
], ProgressBarComponent.prototype, "showSpinner");
__decorate([
    core_1.Input()
], ProgressBarComponent.prototype, "direction");
__decorate([
    core_1.Input()
], ProgressBarComponent.prototype, "thick");
__decorate([
    core_1.Input()
], ProgressBarComponent.prototype, "color");
ProgressBarComponent = __decorate([
    core_1.Component({
        selector: 'ng-progress-bar',
        templateUrl: 'progress-bar.component.html',
        styleUrls: ['progress-bar.component.scss'],
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    })
], ProgressBarComponent);
exports.ProgressBarComponent = ProgressBarComponent;

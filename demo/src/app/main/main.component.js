"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var MainComponent = (function () {
    function MainComponent(progress) {
        this.progress = progress;
        this.options = {
            minimum: 0.08,
            maximum: 1,
            ease: 'linear',
            positionUsing: 'translate',
            speed: 200,
            trickleSpeed: 300,
            showSpinner: true,
            direction: "leftToRightIncreased",
            color: '#CC181E',
            thick: false
        };
        this.directions = [
            'leftToRightIncreased',
            'rightToLeftIncreased',
            'leftToRightReduced',
            'rightToLeftReduced'
        ];
        this.positionMethods = [
            'margin',
            'translate3d',
            'translate'
        ];
    }
    MainComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.toggle = true;
        setTimeout(function () {
            _this.toggle = false;
        }, 2000);
    };
    MainComponent.prototype.start = function () {
        this.progress.start();
        this.toggle = true;
    };
    MainComponent.prototype.done = function () {
        this.progress.done();
        this.toggle = false;
    };
    return MainComponent;
}());
MainComponent = __decorate([
    core_1.Component({
        selector: 'main',
        templateUrl: './main.component.html',
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    })
], MainComponent);
exports.MainComponent = MainComponent;

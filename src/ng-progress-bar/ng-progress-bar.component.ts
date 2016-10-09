import {Component, Input, ChangeDetectionStrategy, Renderer, ElementRef} from '@angular/core';

@Component({
    selector: 'ng-progress-bar',
    templateUrl: 'ng-progress-bar.component.html',
    styleUrls: ['ng-progress-bar.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgProgressBarComponent {

    @Input() value;
    @Input() positionUsing;
    @Input() ease;
    @Input() speed;
    @Input() showSpinner;
    @Input() direction;

    @Input() set color(color) {
        if (color) {
            let style = this.renderer.createElement(this.elementRef.nativeElement, 'style');
            style.type = 'text/css';
            style.innerHTML = `
         .bar {
            background: ${color} !important;
        }
         .bar:after{
            box-shadow: 0 0 10px ${color}, 0 0 5px ${color} !important;
        }
         .spinner-icon{
            border-top-color: ${color} !important;
            border-left-color: ${color} !important;
        }
    `;
        }
    };

    constructor(private renderer: Renderer,
                private elementRef: ElementRef) {
    }

    barStyles() {
        let styles;

        let n = (!this.value) ? {
            'leftToRightIncreased': '-100',
            'leftToRightReduced': '0',
            'rightToLeftIncreased': '100',
            'rightToLeftReduced': '0'
        }[this.direction] : this.toBarPerc(this.value || 0);

        if (this.positionUsing === "translate3d") {
            styles = {
                'transform': 'translate3d(' + n + '%,0,0)',
                '-webkit-transform': 'translate3d(' + n + '%,0,0)',
                '-moz-transition': 'translate3d(' + n + '%,0,0)',
                '-o-transition': 'translate3d(' + n + '%,0,0)',
                '-ms-transition': 'translate3d(' + n + '%,0,0)',
                'transition': 'all ' + this.speed + 'ms ' + this.ease
            };
        }
        else if (this.positionUsing === 'translate') {
            styles = {
                'transform': 'translate(' + n + '%,0)',
                '-webkit-transform': 'translate(' + n + '%,0)',
                '-moz-transition': 'translate(' + n + '%,0)',
                '-o-transition': 'translate(' + n + '%,0)',
                '-ms-transition': 'translate(' + n + '%,0)',
                'transition': 'all ' + this.speed + 'ms ' + this.ease
            };
        }
        else {
            styles = {
                'marginLeft': n + '%',
                'transition': 'all ' + this.speed + 'ms ' + this.ease
            };
        }

        return styles;
    }


    toBarPerc(n) {
        if (!n) return n;
        return ({
                'leftToRightIncreased': -1 + n,
                'leftToRightReduced': -n,
                'rightToLeftIncreased': 1 - n,
                'rightToLeftReduced': n
            }[this.direction]) * 100;
    }


    spinnerClasses() {
        return {
            'leftToRightIncreased': 'clockwise',
            'leftToRightReduced': 'anti-clockwise',
            'rightToLeftIncreased': 'anti-clockwise',
            'rightToLeftReduced': 'clockwise'
        }[this.direction];
    }

}

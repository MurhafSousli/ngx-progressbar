import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ng-progress-bar',
  template: `
  <div class="ng-progress" *ngIf="state" [class.active]="state.active" [class.thick]="thick">
    <div class="bar" [ngStyle]="barStyles()">
      <div class="bar-shadow" [ngStyle]="shadowStyles()"></div>
    </div>
    <div *ngIf="showSpinner" class="spinner" [ngClass]="spinnerClasses()">
      <div class="spinner-icon" [style.borderTopColor]="color" [style.borderLeftColor]="color"></div>
    </div>
  </div>`,
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
    transition: opacity 200ms linear;
  }

  .active {
    filter: alpha(opacity=100);
    opacity: 1;
    transition: none;
  }

  .bar {
    position: absolute;
    width: 100%;
    height: 2px;
  }

  .thick .bar {
    height: 3px;
  }

  .bar-shadow {
    display: block;
    position: absolute;
    right: 0;
    top: -3px;
    width: 100px;
    height: 100%;
    opacity: 1.0;
    -webkit-transform: rotate(3deg);
    -ms-transform: rotate(3deg);
    -moz-transform: rotate(3deg);
    transform: rotate(3deg);
  }


  .thick .bar-shadow {
    top: -4px;
    -webkit-transform: rotate(4deg);
    -ms-transform: rotate(4deg);
    -moz-transform: rotate(4deg);
    transform: rotate(4deg);
  }

  .thick .spinner-icon {
    width: 24px;
    height: 24px;
    border: solid 3px transparent;
  }

  /* Remove these to get rid of the spinner */
  .spinner {
    display: block;
    position: fixed;
    z-index: 1031;
    top: 15px;
    right: 15px;
  }

  .spinner-icon {
    width: 18px;
    height: 18px;
    box-sizing: border-box;

    border: solid 2px transparent;
    border-radius: 50%;

    -webkit-animation: nprogress-spinner 400ms linear infinite;
    -moz-animation: nprogress-spinner 400ms linear infinite;
    animation: nprogress-spinner 400ms linear infinite;
  }

  .anti-clockwise .spinner-icon {
    -webkit-animation-direction: reverse;
    -moz-animation-direction: rotate(0deg);
    animation-direction: reverse;
  }

  @-webkit-keyframes nprogress-spinner {
    0% {
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes nprogress-spinner {
    0% {
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarComponent {

  @Input() state;
  @Input() positionUsing;
  @Input() ease;
  @Input() speed;
  @Input() showSpinner;
  @Input() direction;
  @Input() thick;
  @Input() color;

  /** Styles for progressbar */
  barStyles() {
    let styles = {
      transition: `all ${this.speed}ms ${this.ease}`,
      backgroundColor: this.color
    };
    /** Get positioning value */
    const n = (!this.state.value) ? {
      leftToRightIncreased: -100,
      leftToRightReduced: 0,
      rightToLeftIncreased: 100,
      rightToLeftReduced: 0
    }[this.direction] : this.toPercentage(this.state.value);

    switch (this.positionUsing) {
      case 'translate3d':
        styles = Object.assign({}, styles, {
          transform: `translate3d(${n}%,0,0)`,
          '-webkit-transform': `translate3d(${n}%,0,0)`,
          '-moz-transform': `translate3d(${n}%,0,0)`,
          '-o-transform': `translate3d(${n}%,0,0)`,
          '-ms-transform': `translate3d(${n}%,0,0)`
        });
        break;
      case 'translate':
        styles = Object.assign({}, styles, {
          transform: `translate(${n}%,0)`,
          '-webkit-transform': `translate(${n}%,0)`,
          '-moz-transform': `translate(${n}%,0)`,
          '-o-transform': `translate(${n}%,0)`,
          '-ms-transform': `translate(${n}%,0)`
        });
        break;
      default:
        styles = Object.assign({}, styles, {
          marginLeft: `${n}%`
        });
    }
    return styles;
  }

  /** Styles for progressbar tail */
  shadowStyles() {
    return {
      boxShadow: `0 0 10px ${this.color}, 0 0 5px ${this.color}`
    };
  }

  toPercentage(n) {
    return ({
      leftToRightIncreased: -1 + n,
      leftToRightReduced: -n,
      rightToLeftIncreased: 1 - n,
      rightToLeftReduced: n
    }[this.direction]) * 100;
  }

  spinnerClasses() {
    return {
      leftToRightIncreased: 'clockwise',
      leftToRightReduced: 'anti-clockwise',
      rightToLeftIncreased: 'anti-clockwise',
      rightToLeftReduced: 'clockwise'
    }[this.direction];
  }
}

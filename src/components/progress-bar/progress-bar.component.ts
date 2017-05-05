import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ng-progress-bar',
  templateUrl: 'progress-bar.component.html',
  styleUrls: ['progress-bar.component.scss'],
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
    let n = (!this.state.value) ? {
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

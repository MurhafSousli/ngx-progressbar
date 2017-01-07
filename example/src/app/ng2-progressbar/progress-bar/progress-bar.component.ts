import {
  Component, Input, ChangeDetectionStrategy, Renderer, ElementRef, style, animate,
  transition, state, trigger
} from '@angular/core';
import {PositionMethod} from "../progress.helper";

@Component({
  selector: 'ng-progress-bar',
  templateUrl: 'progress-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('progressState', [
      state("", style({opacity: 1})),
      transition('void => *', [
        style({
          opacity: 0
        }),
        animate('0.4s ease-in')
      ]),
      transition('* => void', [
        animate('0.4s ease-out', style({
          opacity: 0
        }))
      ])
    ])
  ]
})
export class ProgressBarComponent {

  @Input() state;
  @Input() positionUsing;
  @Input() ease;
  @Input() speed;
  @Input() showSpinner;
  @Input() direction;
  @Input() thick;

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
    let styles = {
      transition: 'all ' + this.speed + 'ms ' + this.ease
    };
    /** Get positioning value */
    let n = (!this.state.value) ? {
        leftToRightIncreased: -100,
        leftToRightReduced: 0,
        rightToLeftIncreased: 100,
        rightToLeftReduced: 0
      }[this.direction] : this.toPercentage(this.state.value);

    switch (this.positionUsing) {
      case PositionMethod.TRANSLATE_3D:
        styles = Object.assign({}, styles, {
          transform: 'translate3d(' + n + '%,0,0)',
          '-webkit-transform': 'translate3d(' + n + '%,0,0)',
          '-moz-transform': 'translate3d(' + n + '%,0,0)',
          '-o-transform': 'translate3d(' + n + '%,0,0)',
          '-ms-transform': 'translate3d(' + n + '%,0,0)'
        });
        break;
      case PositionMethod.TRANSLATE:
        styles = Object.assign({}, styles, {
          transform: 'translate(' + n + '%,0)',
          '-webkit-transform': 'translate(' + n + '%,0)',
          '-moz-transform': 'translate(' + n + '%,0)',
          '-o-transform': 'translate(' + n + '%,0)',
          '-ms-transform': 'translate(' + n + '%,0)'
        });
        break;
      default:
        styles = Object.assign({}, styles, {
          marginLeft: n + '%'
        });
    }
    return styles;
  }


  toPercentage(n) {
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

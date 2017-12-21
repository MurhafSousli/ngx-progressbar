import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { NgProgressState } from '../../models/ng-progress.state';
import { NgProgress } from '../../services/ng-progress.service';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

export interface ProgressBarState {
  containerClasses: any;
  progressStyles: any;
  meteorStyles?: any;
  spinnerClasses?: any;
  spinnerStyles?: any;
}

@Component({
  selector: 'ng-progress-bar',
  templateUrl: './ng-progress-bar.component.html',
  styleUrls: ['./ng-progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgProgressBarComponent implements OnInit {

  @Input() ease: string;
  @Input() speed: number;
  @Input() meteor: boolean;
  @Input() spinner: boolean;
  @Input() spinnerPosition: string;
  @Input() direction: string;
  @Input() thick: string;
  @Input() color: string;

  state$: Observable<ProgressBarState>;

  constructor(public progress: NgProgress) {
  }

  ngOnInit() {
    this.state$ = this.progress.state$.pipe(
      map((state: NgProgressState) => ({
        containerClasses: this.containerClasses(state),
        progressStyles: this.progressBarStyles(state),
        spinnerClasses: this.spinnerClasses(),
        spinnerStyles: this.spinnerStyles(),
        meteorStyles: this.meteor ? this.meteorStyles() : null
      })));
  }

  private containerClasses(state: NgProgressState) {
    return {
      active: state.active,
      thick: this.thick
    };
  }

  private progressBarStyles(state: NgProgressState) {

    const n = (!state.value) ? directionSwitcher[this.direction].bar : this.toPercentage(state.value);
    const translate3d = `translate3d(${n}%,0,0)`;
    return {
      transition: `all ${this.speed}ms ${this.ease}`,
      background: this.color,
      msTransform: translate3d,
      webkitTransform: translate3d,
      transform: translate3d
    };
  }

  /**
   * Styles for progressbar tail
   */
  private meteorStyles() {
    return {
      boxShadow: `0 0 10px ${this.color}, 0 0 5px ${this.color}`,
      left: directionSwitcher[this.direction].meteorLeft,
      transform: directionSwitcher[this.direction].meteorRotate(this.thick),
    };
  }

  /**
   * Convert number to percent
   * @param n - State value
   */
  private toPercentage(n: number) {
    return directionSwitcher[this.direction].toPercentage(n) * 100;
  }

  /**
   * Spinner direction
   */
  private spinnerClasses() {
    return directionSwitcher[this.direction].spinnerClass + ' spinner-' + this.spinnerPosition;
  }

  /**
   * Spinner styles
   */
  private spinnerStyles() {
    return {
      borderTopColor: this.color,
      borderLeftColor: this.color
    };
  }

}

const directionSwitcher = {
  leftToRightIncreased: {
    bar: -100,
    toPercentage: n => -1 + n,
    spinnerClass: 'clockwise',
    meteorRotate: thick => `rotate(${thick ? 4 : 3}deg)`,
    meteorLeft: 'unset'
  },
  leftToRightReduced: {
    bar: 0,
    toPercentage: n => -n,
    spinnerClass: 'anti-clockwise',
    meteorRotate: thick => `rotate(${thick ? 4 : 3}deg)`,
    meteorLeft: 'unset'
  },
  rightToLeftIncreased: {
    bar: 100,
    toPercentage: n => 1 - n,
    spinnerClass: 'anti-clockwise',
    meteorRotate: thick => `rotate(${thick ? -4 : -3}deg)`,
    meteorLeft: 0
  },
  rightToLeftReduced: {
    bar: 0,
    toPercentage: (n) => n,
    spinnerClass: 'clockwise',
    meteorRotate: thick => `rotate(${thick ? -4 : -3}deg)`,
    meteorLeft: 0
  }
};

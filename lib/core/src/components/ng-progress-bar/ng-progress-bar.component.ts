import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { NgProgressState } from '../../models/ng-progress.state';
import { NgProgress } from '../../services/ng-progress.service';

import { of } from 'rxjs/observable/of';
import { switchMap } from 'rxjs/operators';

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

  state$;

  constructor(public progress: NgProgress) {

  }

  ngOnInit() {
    this.state$ = this.progress.state$.pipe(
      switchMap((state: NgProgressState) => {
        return of({
          containerClasses: this.containerClasses(state),
          progressStyles: this.progressBarStyles(state),
          meteorStyles: this.meteorStyles(),
          spinnerClasses: this.spinnerClasses(),
          spinnerStyles: this.spinnerStyles()
        });
      })
    );
  }

  containerClasses(state: NgProgressState) {
    return {
      active: state.active,
      thick: this.thick
    };
  }

  progressBarStyles(state: NgProgressState) {

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
   * @param n - State value
   */
  toPercentage(n: number) {
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

}

const translateX = (n) => {
  return `translate3d(${n}%,0,0)`;
};

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

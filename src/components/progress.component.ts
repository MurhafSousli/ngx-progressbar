import {
  Component, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges
} from '@angular/core';
import { NgProgress } from '../services/progress.service';

@Component({
  selector: 'ng-progress',
  template: `
  <ng-progress-bar
    [speed]="speed"
    [positionUsing]="positionUsing"
    [ease]="ease"
    [showSpinner]="showSpinner"
    [direction]="direction"
    [color]="color"
    [thick]="thick"
    [state]="ngProgress.state | async"
  ></ng-progress-bar>`,
  styles: [`
  :host {
    z-index: 999999;
    pointer-events: none;
    position: relative;
  }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProgressComponent implements OnChanges {

  /** Progress options  */
  @Input() ease = 'linear';
  @Input() positionUsing = 'margin';
  @Input() showSpinner = true;
  @Input() direction = 'leftToRightIncreased';
  @Input() color = '#CC181E';
  @Input() thick = false;
  @Input() maximum = 1;
  @Input() minimum = 0.08;
  @Input() speed = 200;
  @Input() trickleSpeed = 300;
  /** Start/Stop Progressbar */
  @Input() toggle;

  constructor(public ngProgress: NgProgress) {
  }

  ngOnChanges(changes: SimpleChanges) {

    const minChng = changes.minimum;
    const maxChng = changes.maximum;
    const spdChng = changes.speed;
    const tklSpdChng = changes.trickleSpeed;
    const tglChng = changes.toggle;

    if (minChng) {
      if (typeof minChng.currentValue !== 'undefined' && minChng.currentValue !== minChng.previousValue) {
        if (minChng.currentValue < 0 || minChng.currentValue > 1) {
          throw 'Input [minimum] must be between 0 and 1';
        } else {
          this.ngProgress.minimum = minChng.currentValue;
        }
      }
    }

    if (maxChng) {
      if (typeof maxChng.currentValue !== 'undefined' && maxChng.currentValue !== maxChng.previousValue) {
        if (maxChng.currentValue < 0 || maxChng.currentValue > 1) {
          throw 'Input [maximum] must be between 0 and 1';
        } else {
          this.ngProgress.maximum = maxChng.currentValue;
        }
      }
    }

    if (spdChng) {
      if (typeof spdChng.currentValue !== 'undefined' && spdChng.currentValue !== spdChng.previousValue) {
        this.ngProgress.speed = spdChng.currentValue;
      }
    }

    if (tklSpdChng) {
      if (typeof tklSpdChng.currentValue !== 'undefined' && tklSpdChng.currentValue !== tklSpdChng.previousValue) {
        this.ngProgress.trickleSpeed = tklSpdChng.currentValue;
      }
    }

    if (tglChng) {
      if (typeof tglChng.currentValue !== 'undefined' && tglChng.currentValue !== tglChng.previousValue) {
        if (tglChng.currentValue) {
          this.ngProgress.start();
        } else {
          this.ngProgress.done();
        }
      }
    }
  }
}

import { Component, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { NgProgress } from '../../services/progress.service';

@Component({
  selector: 'ng-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProgressComponent implements OnChanges {

  /** Progress options  */
  @Input() ease = 'linear';
  @Input() meteor = true;
  @Input() spinner = true;
  @Input() spinnerPosition = 'right';
  @Input() direction = 'leftToRightIncreased';
  @Input() color = '#1B95E0';
  @Input() thick = false;
  @Input() maximum = 1;
  @Input() minimum = 0.08;
  @Input() speed = 200;
  @Input() trickleSpeed = 300;

  /** Start/Stop Progressbar */
  @Input('toggle') toggleProgressbar(toggle: boolean) {
    toggle ? this.progress.start() : this.progress.done();
  }

  constructor(public progress: NgProgress) {
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
          throw new Error('Input [minimum] must be between 0 and 1');
        } else {
          this.progress.minimum = minChng.currentValue;
        }
      }
    }

    if (maxChng) {
      if (typeof maxChng.currentValue !== 'undefined' && maxChng.currentValue !== maxChng.previousValue) {
        if (maxChng.currentValue < 0 || maxChng.currentValue > 1) {
          throw new Error('Input [maximum] must be between 0 and 1');
        } else {
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
  }
}

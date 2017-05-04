import {
  Component, Input, ChangeDetectionStrategy, ViewEncapsulation, OnChanges, SimpleChanges, OnDestroy
} from '@angular/core';
import { NgProgressService } from '../../service/progress.service';

@Component({
  selector: 'ng-progress',
  templateUrl: 'progress.component.html',
  styleUrls: ['progress.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProgressComponent implements OnChanges, OnDestroy {

  progress: NgProgressService;
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

  constructor(progress: NgProgressService) {
    this.progress = progress;
  }

  ngOnChanges(changes: SimpleChanges) {

    let minChng = changes['minimum'];
    let maxChng = changes['maximum'];
    let spdChng = changes['speed'];
    let tklSpdChng = changes['trickleSpeed'];
    let tglChng = changes['toggle'];

    if (minChng) {
      if (typeof minChng.currentValue !== 'undefined' && minChng.currentValue !== minChng.previousValue) {
        if (minChng.currentValue < 0 || minChng.currentValue > 1) {
          throw 'Input [minimum] must be between 0 and 1';
        } else {
          this.progress.minimum = minChng.currentValue;
        }
      }
    }

    if (maxChng) {
      if (typeof maxChng.currentValue !== 'undefined' && maxChng.currentValue !== maxChng.previousValue) {
        if (maxChng.currentValue < 0 || maxChng.currentValue > 1) {
          throw 'Input [maximum] must be between 0 and 1';
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

    if (tglChng) {
      if (typeof tglChng.currentValue !== 'undefined' && tglChng.currentValue !== tglChng.previousValue) {
        if (tglChng.currentValue) {
          this.progress.start();
        } else {
          this.progress.done();
        }
      }
    }
  }
}

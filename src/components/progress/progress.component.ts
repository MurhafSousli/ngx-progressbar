import {
  Component, Input, ChangeDetectionStrategy, ViewEncapsulation, OnChanges, SimpleChanges
} from '@angular/core';
import {NgProgressService} from "../../service/progress.service";

@Component({
  selector: 'ng-progress',
  templateUrl: 'progress.component.html',
  styleUrls: ['progress.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProgressComponent implements OnChanges {

  progress: NgProgressService;
  /** Progress options  */
  @Input() ease = 'linear';
  @Input() positionUsing = 'margin';
  @Input() showSpinner = true;
  @Input() direction = "leftToRightIncreased";
  @Input() color = '#29d';
  @Input() thick = false;
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
    let spdChng = changes['speed'];
    let tklSpdChng = changes['trickleSpeed'];
    let tglChng = changes['toggle'];

    this.progress.minimum = (minChng !== undefined && minChng.currentValue !== minChng.previousValue) ?
      minChng.currentValue : this.minimum;

    this.progress.speed = (spdChng && spdChng.currentValue !== spdChng.previousValue) ?
      spdChng.currentValue : this.speed;

    this.progress.trickleSpeed = (tklSpdChng && tklSpdChng.currentValue !== tklSpdChng.previousValue) ?
      tklSpdChng.currentValue : this.trickleSpeed;

    if (tglChng && tglChng.currentValue !== tglChng.previousValue)
      tglChng.currentValue ? this.progress.start() : this.progress.done();
  };
}

import {
  Component, Input, ChangeDetectionStrategy, ViewEncapsulation, OnChanges, SimpleChanges
} from '@angular/core';
import {ProgressService} from "../progress.service";

@Component({
  selector: 'ng-progress',
  templateUrl: 'progress.component.html',
  styleUrls: ['progress.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProgressComponent implements OnChanges {

  /** Progress options  */
  @Input() ease = 'linear';
  @Input() positionUsing = '';
  @Input() showSpinner = true;
  @Input() direction = "leftToRightIncreased";
  @Input() color;
  @Input() thick;
  @Input() minimum;
  @Input() speed;
  @Input() trickleSpeed;
  /** Start/Stop Progressbar */
  @Input() toggle;

  constructor(private progress: ProgressService) {

  }

  ngOnChanges(changes: SimpleChanges) {

    let minimumChange = changes['minimum'];
    let speedChange = changes['speed'];
    let trickleSpeedChange = changes['trickleSpeed'];
    let toggleChange = changes['toggle'];

    if (minimumChange && minimumChange.currentValue !== minimumChange.previousValue)
      this.progress.minimum = minimumChange.currentValue;

    if (speedChange && speedChange.currentValue !== speedChange.previousValue)
      this.progress.speed = speedChange.currentValue;

    if (trickleSpeedChange && trickleSpeedChange.currentValue !== trickleSpeedChange.previousValue)
      this.progress.trickleSpeed = trickleSpeedChange.currentValue;

    if (toggleChange && toggleChange.currentValue !== toggleChange.previousValue)
      toggleChange.currentValue ? this.progress.start() : this.progress.done();

  };
}

import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgProgress, NgProgressRef } from 'ngx-progressbar';

@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('false', style({ opacity: 0, visibility: 'hidden' })),
      transition('true => false', [
        style({ opacity: 1, visibility: 'visible' }),
        animate(280, style({ opacity: 0 }))
      ])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomComponent implements OnInit, OnDestroy {

  progressRef: NgProgressRef;

  constructor(public ngProgress: NgProgress) {
  }

  ngOnInit() {
    this.progressRef = this.ngProgress.ref('material');
  }

  ngOnDestroy() {
    this.progressRef.destroy();
  }

  toggle() {
    if (!this.progressRef.isStarted) {
      this.progressRef.start();
    } else {
      this.progressRef.complete();
    }
  }

}

import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({opacity: 0})),
      transition(':leave', [
        style({opacity: 1}),
        animate(300,
          style({opacity: 0}))
      ]),
      transition(':enter', [
        style({opacity: 0}),
        animate(5,
          style({opacity: 1}))
      ])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false
})
export class CustomComponent implements OnInit, OnDestroy {

  progressRef: NgProgressRef;

  constructor(public ngProgress: NgProgress) {
  }

  ngOnInit() {
    this.progressRef = this.ngProgress.ref('material');
  }

  ngOnDestroy() {
    this.ngProgress.destroy('material');
  }

  toggle() {
    if (!this.progressRef.isStarted) {
      this.progressRef.start();
    } else {
      this.progressRef.complete();
    }
  }

}

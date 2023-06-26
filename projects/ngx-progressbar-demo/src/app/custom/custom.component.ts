import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressBarModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule]
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

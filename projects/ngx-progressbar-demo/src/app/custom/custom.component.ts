import { ChangeDetectionStrategy, Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatCard } from '@angular/material/card';
import { NgProgressRef } from 'ngx-progressbar';

@Component({
  standalone: true,
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
  imports: [MatCard, MatProgressBar, MatIcon, MatProgressSpinner, NgProgressRef, MatFabButton]
})
export class CustomComponent {
}

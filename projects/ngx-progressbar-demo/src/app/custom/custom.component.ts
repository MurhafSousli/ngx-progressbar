import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
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
  imports: [CommonModule, MatCardModule, MatProgressBarModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, NgProgressRef]
})
export class CustomComponent {
}

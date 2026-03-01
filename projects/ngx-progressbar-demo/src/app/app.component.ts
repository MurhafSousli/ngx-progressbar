import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgProgressbar } from 'ngx-progressbar';
import { NgProgressRouter } from 'ngx-progressbar/router';
import { HeaderComponent } from './header/header.component';

if (!ngServerMode && ngDevMode) {
  const tick = ApplicationRef.prototype.tick;
  let ticks = 0;
  ApplicationRef.prototype.tick = function () {
    ticks += 1;
    console.log('Ticks called: ', ticks);
    return tick.call(this);
  };
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, HeaderComponent, NgProgressbar, NgProgressRouter],
})
export class AppComponent {}

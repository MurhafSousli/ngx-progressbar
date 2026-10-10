import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgProgressbar } from 'ngx-progressbar-next';
import { NgProgressRouter } from 'ngx-progressbar-next/router';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, HeaderComponent, NgProgressbar, NgProgressRouter]
})
export class AppComponent {
}

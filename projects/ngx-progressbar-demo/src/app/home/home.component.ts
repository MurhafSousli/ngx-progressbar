import { Component, signal, inject, WritableSignal, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgProgressbar, NgProgressOptions } from 'ngx-progressbar';
import { NgProgressHttp } from 'ngx-progressbar/http';
import { LabComponent } from './lab/lab.component';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgProgressbar, LabComponent, NgProgressHttp]
})
export class HomeComponent {

  options: NgProgressOptions = {
    min: 8,
    max: 100,
    speed: 200,
    trickleSpeed: 300,
    fadeOutSpeed: 50,
    debounceTime: 0,
    spinnerPosition: 'right',
    direction: 'ltr+',
    relative: false,
    flat: false,
    spinner: true
  };

  private readonly http: HttpClient = inject(HttpClient);

  preventAbuse: WritableSignal<boolean> = signal<boolean>(false);
  startedClass: WritableSignal<boolean> = signal<boolean>(false);
  endedClass: WritableSignal<boolean> = signal<boolean>(false);

  onProgressStarted(): void {
    this.startedClass.set(true);
    setTimeout(() => {
      this.startedClass.set(false);
    }, 800);
  }

  onProgressCompleted(): void {
    this.endedClass.set(true);
    setTimeout(() => {
      this.endedClass.set(false);
    }, 800);
  }

  testHttp(): void {
    this.preventAbuse.set(true);

    this.http.get('https://reqres.in/api/users?delay=1').subscribe(() => {
      setTimeout(() => {
        this.preventAbuse.set(false);
      }, 800);
    });
  }
}

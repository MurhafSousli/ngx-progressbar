import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { NgProgressbar, NgProgressOptions } from 'ngx-progressbar';
import { NgProgressHttp, provideNgProgressHttp } from 'ngx-progressbar/http';
import { LabComponent } from './lab/lab.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers: [
    // provideNgProgressHttp(),
  ],
  imports: [CommonModule, NgProgressbar, LabComponent, NgProgressHttp]
})
export class HomeComponent {

  options: NgProgressOptions = {
    min: 8,
    max: 100,
    speed: 200,
    trickleSpeed: 300,
    debounceTime: 0,
    spinnerPosition: 'right',
    direction: 'ltr+',
    relative: false,
    flat: false,
    spinner: true
  };

  preventAbuse = new Subject<boolean>();
  startedClass = new Subject<boolean>();
  endedClass = new Subject<boolean>();

  constructor(private http: HttpClient) {
  }

  onProgressStarted() {
    this.startedClass.next(true);
    setTimeout(() => {
      this.startedClass.next(false);
    }, 800);
  }

  onProgressCompleted() {
    this.endedClass.next(true);
    setTimeout(() => {
      this.endedClass.next(false);
    }, 800);
  }

  testHttp() {
    this.preventAbuse.next(true);

    this.http.get('https://reqres.in/api/users?delay=1')
      .subscribe(() => {
        setTimeout(() => {
          this.preventAbuse.next(false);
        }, 800);
      });
  }

}

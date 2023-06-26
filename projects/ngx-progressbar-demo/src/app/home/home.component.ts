import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgProgressConfig, NgProgressModule } from 'ngx-progressbar';
import { Subject } from 'rxjs';
import { LabComponent } from './lab/lab.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, NgProgressModule, LabComponent]
})
export class HomeComponent {

  options: NgProgressConfig = {
    min: 8,
    max: 100,
    speed: 200,
    trickleSpeed: 300,
    debounceTime: 0,
    ease: 'linear',
    spinnerPosition: 'right',
    direction: 'ltr+',
    color: 'red',
    fixed: true,
    meteor: true,
    spinner: true,
    thick: false
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

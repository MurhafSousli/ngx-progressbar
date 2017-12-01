import { Component, OnInit } from '@angular/core';
import { NgProgress } from './progressbar';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  options = {
    minimum: 0.08,
    maximum: 1,
    ease: 'linear',
    speed: 200,
    trickleSpeed: 300,
    meteor: true,
    spinner: true,
    spinnerPosition: 'right',
    direction: 'leftToRightIncreased',
    color: '#1B95E0',
    thick: false
  };

  startedClass = false;
  endedClass = false;
  preventAbuse = false;

  constructor(public progress: NgProgress, private http: HttpClient) {
  }

  ngOnInit() {

    this.progress.started.subscribe(() => {

      this.startedClass = true;
      setTimeout(() => {
        this.startedClass = false;
      }, 800);
    });

    this.progress.ended.subscribe(() => {

      this.endedClass = true;
      setTimeout(() => {
        this.endedClass = false;
      }, 800);
    });
  }

  testHttp() {
    this.preventAbuse = true;
    this.http.get('https://jsonplaceholder.typicode.com/posts/1').subscribe(res => {
      console.log(res);
      setTimeout(() => {
        this.preventAbuse = false;
      }, 800);
    });
  }
}

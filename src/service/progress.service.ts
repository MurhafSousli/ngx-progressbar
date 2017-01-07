import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/repeat';
import 'rxjs/add/operator/takeWhile';

@Injectable()
export class NgProgressService {

  minimum = 0.08;
  speed = 300;
  trickleSpeed = 300;
  progress = 0;
  /** Progress state */
  state$: Subject<any>;
  /** Trickling stream */
  trickling$: Subject<any>;

  constructor() {
    this.state$ = new Subject<any>();
    this.trickling$ = new Subject<any>();

    this.trickling$.switchMap(() => {
      return Observable
        .timer(0, this.trickleSpeed)
        .do(() => this.inc())
        .repeat()
        .takeWhile(() => this.isStarted());
    }).subscribe();
  }

  set(n) {
    this.progress = this.clamp(n, this.minimum, 1);
    let state = {
      value: this.progress,
      active: true
    };
    /** emit new state */
    this.state$.next(state);

    /** if progress is 100%, deactivate after speed interval */
    if (!this.isStarted())
      setTimeout(() => {
        state = {
          value: this.progress,
          active: false
        };
        this.state$.next(state);
      }, this.speed);
  }

  start() {
    if (!this.isStarted()) this.set(0);
    this.trickling$.next();
  }

  done() {
    this.set(1);
  }

  inc(amount?) {
    /** if it hasn't start, start */
    if (!this.progress) this.start();
    /** if progress complete quit */
    else if (this.progress >= 1) return;
    /** if amount is invalid or out of range, increment */
    else if (typeof amount !== 'number' || amount >= 1) {
      if (this.progress >= 0 && this.progress < 0.25) {
        // Start out between 3 - 6% increments
        amount = (Math.random() * (5 - 3 + 1) + 3) / 100;
      } else if (this.progress >= 0.25 && this.progress < 0.65) {
        // increment between 0 - 3%
        amount = (Math.random() * 3) / 100;
      } else if (this.progress >= 0.65 && this.progress < 0.9) {
        // increment between 0 - 2%
        amount = (Math.random() * 2) / 100;
      } else if (this.progress >= 0.9 && this.progress < 0.99) {
        // finally, increment it .5 %
        amount = 0.005;
      } else {
        // after 99%, don't increment:
        amount = 0;
      }
    }
    this.progress = this.clamp(this.progress + amount, 0, 0.994);
    this.set(this.progress);
  }

  /** if progress is started*/
  isStarted() {
    return this.progress && this.progress !== 1;
  }

  clamp = (n, min, max) => {
    if (n < min) return min;
    if (n > max) return max;
    return n;
  }

}


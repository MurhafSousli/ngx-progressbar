import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/delay';

@Injectable()
export class NgProgressService {

  minimum = 0;
  speed = 200;
  trickleSpeed = 300;
  progress = 0;

  /** Progress state */
  state$: Subject<any>;
  /** Trickling stream */
  trickling$: Subject<any>;

  constructor() {
    this.state$ = new Subject();
    this.trickling$ = new Subject();

    /** while progress is started keep emitting values */
    this.trickling$.switchMap((res) => {
      return Observable
        .timer(0, this.trickleSpeed)
        .takeWhile(() => this.isStarted())
        .do(() => this.inc(res))
    }).subscribe();
  }

  /** Start */
  start() {
    if (!this.isStarted()) this.set(0);
    this.trickling$.next();
  }

  /** Complete */
  done() {
    /** if it hasn't already started don't complete the progress */
    if (!this.isStarted()) return;
    this.set(.3 + .5 * Math.random());
    this.set(1);
  }

  /** Set progress state */
  set(n) {
    this.progress = this.clamp(n, this.minimum, 1);
    this.updateState(this.progress, true);
    /** if progress completed */
    if (n === 1) {
      /** complete then hide progressbar */
      Observable.of(n)
        .delay(this.speed)
        .do(() => {
          this.updateState(this.progress, false);
        })
        .delay(this.speed)
        .do(() => {
          /** reset progress */
          this.progress = 0;
          this.updateState(this.progress, false)
        }).subscribe();
    }
  }

  /** Increment Progress */
  inc(amount?) {
    let n = this.progress;
    /** if it hasn't start, start */
    if (!this.isStarted()) this.start();
    else {
      if (typeof amount !== 'number') {
        if (n >= 0 && n < 0.2) amount = 0.1;
        else if (n >= 0.2 && n < 0.5) amount = 0.04;
        else if (n >= 0.5 && n < 0.8) amount = 0.02;
        else if (n >= 0.8 && n < 0.99) amount = 0.005;
        else amount = 0;
      }
      n = this.clamp(n + amount, 0, 0.994);
      this.set(n);
    }
  }

  /** Is progress started*/
  isStarted() {
    return this.progress && this.progress < 1;
  }

  /** Helper */
  clamp = (n, min, max) => {
    if (n < min) return min;
    if (n > max) return max;
    return n;
  };

  /** Update Progressbar State */
  updateState(value, active) {
    let state = {
      value: value,
      active: active
    };
    this.state$.next(state);
  }
}


import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { timer } from 'rxjs/observable/timer';
import { filter, map, distinctUntilChanged, skip, takeWhile, tap, switchMap } from 'rxjs/operators';

import { NgProgressState } from '../models/progress.state';

/**
 * Keep value within the range
 */
const clamp = (n, min, max) => {
  if (n < min) {
    return min;
  }
  if (n > max) {
    return max;
  }
  return n;
};

@Injectable()
export class NgProgress {

  /** Initial state */
  initState: NgProgressState = {
    active: false,
    value: 0
  };

  /** Progress state */
  state$ = new BehaviorSubject(this.initState);

  /** Trickling stream */
  trickling$ = new Subject();

  progress = 0;
  maximum = 1;
  minimum = 0.08;
  speed = 200;
  trickleSpeed = 300;

  /** Is progress started */
  get isStarted(): boolean {
    return this.progress > 0 && this.progress < this.maximum;
  }

  /** Progress start event */
  get started(): Observable<boolean> {
    return this.state$.pipe(
      map((state: NgProgressState) => state.active),
      distinctUntilChanged(),
      filter(active => active)
    );
  }

  /** Progress ended event */
  get ended(): Observable<boolean> {
    return this.state$.pipe(
      map((state: NgProgressState) => state.active),
      distinctUntilChanged(),
      filter(active => !active),
      skip(1)
    );
  }

  constructor() {

    this.trickling$.pipe(
      switchMap(() => timer(0, this.trickleSpeed).pipe(
        takeWhile(() => this.isStarted),
        tap(() => this.inc()))
      )
    ).subscribe();
  }

  /** Start */
  async start() {
    if (!this.isStarted) {
      this.set(this.minimum);
    }
    this.trickling$.next();
  }

  /** Done */
  async done() {
    /** if started, complete the progress */
    if (this.isStarted) {
      this.set(.3 + .5 * Math.random());
      this.set(this.maximum);
    }
  }

  /**
   * Increment the progress
   * @param {number} amount
   */
  async inc(amount?: number) {
    let n = this.progress;
    /** if it hasn't start, start */
    if (!this.isStarted) {
      this.start();
    } else {
      if (typeof amount !== 'number') {
        if (n >= 0 && n < 0.2) {
          amount = 0.1;
        } else if (n >= 0.2 && n < 0.5) {
          amount = 0.04;
        } else if (n >= 0.5 && n < 0.8) {
          amount = 0.02;
        } else if (n >= 0.8 && n < 0.99) {
          amount = 0.005;
        } else {
          amount = 0;
        }
      }
      n = clamp(n + amount, 0, 0.994);
      this.set(n);
    }
  }

  /**
   * Set the progress
   * @param {number} n - Progress value
   */
  async set(n: number) {
    this.progress = clamp(n, this.minimum, this.maximum);
    this.updateState(this.progress, true);

    /** if progress completed */
    if (n === this.maximum) {
      const hide = () => {
        /**
         *  reset the progress
         *  Keep it { 0, false } to fadeOut progress-bar after complete
         */
        if (this.progress >= this.maximum) {
          this.progress = 0;
          this.updateState(this.progress, false);
        }
      };
      const complete = () => {
        /**
         * complete the progress
         * { 1, false } to complete progress-bar before hiding
         */
        if (this.progress >= this.maximum) {
          this.updateState(this.progress, false);
          setTimeout(hide, this.speed);
        }
      };
      setTimeout(complete, this.speed);
    }
  }

  /**
   * Update progress state
   * @param {number} progress - Progress value
   * @param {boolean} isActive - Progress active
   */
  private updateState(progress: number, isActive: boolean) {
    this.state$.next({
      active: isActive,
      value: progress
    });
  }
}

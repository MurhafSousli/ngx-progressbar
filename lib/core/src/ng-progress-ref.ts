import { NgProgressState, NgProgressConfig } from './ng-progress.interface';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { timer } from 'rxjs/observable/timer';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { tap, map, skip, delay, filter, switchMap, combineLatest, distinctUntilChanged } from 'rxjs/operators';

export class NgProgressRef {

  private _state: NgProgressState = {active: false, value: 0};
  private _config: NgProgressConfig;

  /** Worker subscription used to unsubscribe from trickling$ stream */
  private _workerSub$: Subscription;

  /** Stream that increments and updates progress state */
  private _trickling$ = new Subject();

  /** Stream that emits when progress state is changed */
  state$ = new BehaviorSubject<NgProgressState>(this._state);

  /** Stream that emits when config is changed */
  config$ = new Subject<NgProgressConfig>();

  get isStarted(): boolean {
    return this._state.active;
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
  get completed(): Observable<boolean> {
    return this.state$.pipe(
      map((state: NgProgressState) => state.active),
      distinctUntilChanged(),
      filter(active => !active),
      skip(1)
    );
  }

  constructor(config: NgProgressConfig) {

    /**
     * Trickling stream starts the timer that increment the progress bar continuously
     * This stream makes it possible to use latest config values while incrementing
     */
    this._workerSub$ = this._trickling$.pipe(
      combineLatest(this.config$),
      switchMap(([start, latestConfig]) => start ? this._trickling(latestConfig) : this._complete(latestConfig))
    ).subscribe();

    this.setConfig(config);
  }

  start() {
    if (!this.isStarted) {
      this.set(this._config.min);
    }
    this._trickling$.next(true);
  }

  complete() {
    if (this.isStarted) {
      this._trickling$.next(false);
    }
  }

  inc(amount?: number) {

    let n = this._state.value;

    if (!this.isStarted) {
      this.start();
    } else {
      if (typeof amount !== 'number') {
        if (n >= 0 && n < 20) {
          amount = 10;
        } else if (n >= 20 && n < 50) {
          amount = 4;
        } else if (n >= 50 && n < 80) {
          amount = 2;
        } else if (n >= 80 && n < 99) {
          amount = 0.5;
        } else {
          amount = 0;
        }
      }
      n = this._clamp(n + amount);
      this.set(n);
    }
  }

  set(n: number) {
    this._setState({value: this._clamp(n), active: true});
  }

  setConfig(config: NgProgressConfig) {
    this._config = {...this._config, ...config};
    this.config$.next(this._config);
  }

  /**
   * Meant to be used internally and not by user directly
   * Users should use NgProgressManager.destroy(id) instead
   */
  destroy() {
    this._workerSub$.unsubscribe();
    this._trickling$.unsubscribe();
    this.state$.unsubscribe();
    this.config$.unsubscribe();
  }

  private _setState(state: NgProgressState) {
    this._state = {...this._state, ...state};
    this.state$.next(this._state);
  }

  /** Clamps a value to be between min and max */
  private _clamp(n): number {
    return Math.max(this._config.min, Math.min(this._config.max, n));
  }

  /** Keeps incrementing the progress */
  private _trickling(config: NgProgressConfig) {
    return timer(0, config.trickleSpeed).pipe(tap(() => this.inc()));
  }

  /** Completes then resets the progress */
  private _complete(config: NgProgressConfig) {
    return of({}).pipe(
      // Completes the progress
      tap(() => this._setState({value: 100})),

      // Hides the progress bar after a tiny delay
      delay(config.speed * 1.7),
      tap(() => this._setState({active: false})),

      // Resets the progress state
      delay(config.speed),
      tap(() => this._setState({value: 0}))
    );
  }
}

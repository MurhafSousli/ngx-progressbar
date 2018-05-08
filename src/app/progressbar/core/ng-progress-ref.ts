import { NgProgressState, NgProgressConfig } from './ng-progress.interface';
import { Observable, Subject, BehaviorSubject, timer, of, combineLatest } from 'rxjs';
import { tap, map, skip, delay, filter, debounce, switchMap, distinctUntilChanged } from 'rxjs/operators';

export class NgProgressRef {

  private _state: NgProgressState = {active: false, value: 0};
  private _config: NgProgressConfig;

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

  constructor(customConfig: NgProgressConfig) {

    combineLatest(this._trickling$, this.config$).pipe(
      debounce(([start, config]: [boolean, NgProgressConfig]) => timer(start ? this._config.debounceTime : 0)),
      switchMap(([start, config]: [boolean, NgProgressConfig]) => start ? this._trickling(config) : this._complete(config))
    ).subscribe();

    this.setConfig(customConfig);
  }

  start() {
    this._trickling$.next(true);
  }

  complete() {
    this._trickling$.next(false);
  }

  inc(amount?: number) {
    const n = this._state.value;
    if (!this.isStarted) {
      this.start();
    } else {
      if (typeof amount !== 'number') {
        amount = this._config.trickleFunc(n);
      }
      this.set(n + amount);
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
    this._trickling$.complete();
    this.state$.complete();
    this.config$.complete();
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
    if (!this.isStarted) {
      this.set(this._config.min);
    }
    return timer(0, config.trickleSpeed).pipe(tap(() => this.inc()));
  }

  /** Completes then resets the progress */
  private _complete(config: NgProgressConfig) {
    return !this.isStarted ? of({}) : of({}).pipe(
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

import { Observable, Subject, BehaviorSubject, timer, of, combineLatest, Subscription, EMPTY } from 'rxjs';
import { tap, delay, debounce, switchMap, takeUntil, finalize, filter } from 'rxjs/operators';
import { NgProgressState, NgProgressConfig } from './ng-progress.interface';

export class NgProgressRef {

  // Stream that emits when progress state is changed
  private readonly _state: BehaviorSubject<NgProgressState>;
  state: Observable<NgProgressState>;

  // Stream that emits when config is changed
  private readonly _config: BehaviorSubject<NgProgressConfig>;
  config: Observable<NgProgressState>;

  // Progress start source event (used to cancel finalizing delays)
  private readonly _started = new Subject();
  // Progress start event: stream that emits only when it hasn't already started
  readonly started = this._started.pipe(filter(() => !this.isStarted));

  // Progress ended source event
  private readonly _completed = new Subject();
  // Progress start event: stream that emits only when it has already started
  readonly completed = this._completed.pipe(filter(() => this.isStarted));

  // Stream that increments and updates the progress state
  private readonly _trickling = new Subject();

  // Stream that combines "_trickling" and "config" streams
  private readonly _worker = Subscription.EMPTY;

  // Get current progress state
  private get currState(): NgProgressState {
    return this._state.value;
  }

  // Check if progress has started
  get isStarted(): boolean {
    return this.currState.active;
  }

  constructor(customConfig: NgProgressConfig, private _onDestroyCallback: () => void) {
    this._state = new BehaviorSubject<NgProgressState>({ active: false, value: 0 });
    this._config = new BehaviorSubject<NgProgressConfig>(customConfig);
    this.state = this._state.asObservable();
    this.config = this._state.asObservable();

    this._worker = combineLatest(this._trickling, this._config).pipe(
      debounce(([start, config]: [boolean, NgProgressConfig]) => timer(start ? config.debounceTime : 0)),
      switchMap(([start, config]: [boolean, NgProgressConfig]) => start ? this.onTrickling(config) : this.onComplete(config))
    ).subscribe();
  }

  /**
   * Start the progress
   */
  start() {
    this._started.next();
    this._trickling.next(true);
  }

  /**
   * Complete the progress
   */
  complete() {
    this._trickling.next(false);
  }

  /**
   * Increment the progress
   */
  inc(amount?: number) {
    const n = this.currState.value;
    if (!this.isStarted) {
      this.start();
    } else {
      if (typeof amount !== 'number') {
        amount = this._config.value.trickleFunc(n);
      }
      this.set(n + amount);
    }
  }

  /**
   * Set the progress
   */
  set(n: number) {
    this.setState({ value: this.clamp(n), active: true });
  }

  /**
   * Set config
   */
  setConfig(config: NgProgressConfig) {
    this._config.next({ ...this._config.value, ...config });
  }

  /**
   * Destroy progress reference
   */
  destroy() {
    this._worker.unsubscribe();
    this._trickling.complete();
    this._state.complete();
    this._config.complete();
    this._started.complete();
    this._completed.complete();
    this._onDestroyCallback();
  }

  /**
   * Set progress state
   */
  private setState(state: NgProgressState) {
    this._state.next({ ...this.currState, ...state });
  }

  /**
   * Clamps a value to be between min and max
   */
  private clamp(n: number): number {
    return Math.max(this._config.value.min, Math.min(this._config.value.max, n));
  }

  /**
   * Keeps incrementing the progress
   */
  private onTrickling(config: NgProgressConfig): Observable<number> {
    if (!this.isStarted) {
      this.set(this._config.value.min);
    }
    return timer(0, config.trickleSpeed).pipe(tap(() => this.inc()));
  }

  /**
   * Completes then resets the progress
   */
  private onComplete(config: NgProgressConfig): Observable<any> {
    this._completed.next();
    return !this.isStarted ? EMPTY : of({}).pipe(
      // Complete the progress
      tap(() => this.setState({ value: 100 })),

      // Deactivate the progress after a tiny delay
      delay(config.speed * 1.7),
      tap(() => this.setState({ active: false })),

      // Use a tiny delay before resetting
      delay(config.speed),
      // Force the progress to reset even it got cancelled
      finalize(() => this.setState({ value: 0 })),
      // Cancel any of the finalizing delays if the progress has started again
      takeUntil(this._started)
    );
  }
}

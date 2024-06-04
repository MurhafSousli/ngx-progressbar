import {
  Observable,
  Subject,
  BehaviorSubject,
  Subscription,
  of,
  tap,
  delay,
  filter,
  timer,
  debounce,
  switchMap,
  finalize,
  takeUntil,
  combineLatest,
  EMPTY
} from 'rxjs';
import { NgProgressState, NgProgressConfig, ProgressConfig, ProgressState } from './ng-progress.interface';

export class NgProgressRef {

  // Stream that emits when progress state is changed
  private readonly _state: BehaviorSubject<ProgressState>;
  state: Observable<ProgressState>;

  // Stream that emits when config is changed
  private readonly _config: BehaviorSubject<ProgressConfig>;
  config: Observable<ProgressConfig>;

  // Progress start source event (used to cancel finalizing delays)
  private readonly _started: Subject<void> = new Subject<void>();
  // Progress start event: stream that emits only when it hasn't already started
  readonly started: Observable<void> = this._started.pipe(filter(() => !this.isStarted));

  // Progress ended source event
  private readonly _completed: Subject<void> = new Subject<void>();
  // Progress start event: stream that emits only when it has already started
  readonly completed: Observable<void> = this._completed.pipe(filter(() => this.isStarted));

  // Stream that increments and updates the progress state
  private readonly _trickling: Subject<boolean> = new Subject<boolean>();

  // Stream that combines "_trickling" and "config" streams
  private readonly _worker: Subscription;

  // Get current progress state
  private get snapshot(): ProgressState {
    return this._state.value;
  }

  // Check if progress has started
  get isStarted(): boolean {
    return this.snapshot.active;
  }

  constructor(customConfig: ProgressConfig, private _onDestroyCallback: () => void) {
    this._state = new BehaviorSubject<ProgressState>({ active: false, value: 0 });
    this._config = new BehaviorSubject<ProgressConfig>(customConfig);
    this.state = this._state.asObservable();
    this.config = this._config.asObservable();

    this._worker = combineLatest([this._trickling, this._config]).pipe(
      debounce(([start, config]: [boolean, ProgressConfig]) => timer(start ? config.debounceTime : 0)),
      switchMap(([start, config]: [boolean, ProgressConfig]) => start ? this.onTrickling(config) : this.onComplete(config))
    ).subscribe();
  }

  /**
   * Start the progress
   */
  start(): void {
    this._started.next();
    this._trickling.next(true);
  }

  /**
   * Complete the progress
   */
  complete(): void {
    this._trickling.next(false);
  }

  /**
   * Increment the progress
   */
  inc(amount?: number): void {
    const n = this.snapshot.value;
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
  set(n: number): void {
    this.setState({ value: this.clamp(n), active: true });
  }

  /**
   * Set config
   */
  setConfig(config: NgProgressConfig): void {
    this._config.next({ ...this._config.value, ...config });
  }

  /**
   * Destroy progress reference
   */
  destroy(): void {
    this._worker?.unsubscribe();
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
  private setState(state: NgProgressState): void {
    this._state.next({ ...this.snapshot, ...state });
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
  private onTrickling(config: ProgressConfig): Observable<number> {
    if (!this.isStarted) {
      this.set(this._config.value.min);
    }
    return timer(0, config.trickleSpeed).pipe(tap(() => this.inc()));
  }

  /**
   * Completes then resets the progress
   */
  private onComplete(config: ProgressConfig): Observable<any> {
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

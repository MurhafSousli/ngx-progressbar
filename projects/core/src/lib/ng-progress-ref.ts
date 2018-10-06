import { NgProgressState, NgProgressConfig } from './ng-progress.interface';
import { Observable, Subject, BehaviorSubject, timer, of, combineLatest, SubscriptionLike, Subscription } from 'rxjs';
import { tap, map, skip, delay, filter, debounce, switchMap, distinctUntilChanged } from 'rxjs/operators';

export class NgProgressRef {

  /** Stream that emits when progress state is changed */
  private readonly _state: BehaviorSubject<NgProgressState>;
  state: Observable<NgProgressState>;

  /** Stream that emits when config is changed */
  private readonly _config: BehaviorSubject<NgProgressConfig>;
  config: Observable<NgProgressState>;

  /** Stream that increments and updates progress state */
  private readonly _trickling = new Subject();

  /** Stream that combines "_trickling" and "config" streams */
  private readonly _worker: SubscriptionLike = Subscription.EMPTY;

  /** Get current progress state */
  private get currState(): NgProgressState {
    return this._state.value;
  }

  /** Check if progress has started */
  get isStarted(): boolean {
    return this.currState.active;
  }

  /** Progress start event */
  get started(): Observable<boolean> {
    return this._state.pipe(
      map((state: NgProgressState) => state.active),
      distinctUntilChanged(),
      filter(active => active)
    );
  }

  /** Progress ended event */
  get completed(): Observable<boolean> {
    return this._state.pipe(
      map((state: NgProgressState) => state.active),
      distinctUntilChanged(),
      filter(active => !active),
      skip(1)
    );
  }

  constructor(customConfig: NgProgressConfig, private deleteInstance: Function) {
    this._state = new BehaviorSubject<NgProgressState>({active: false, value: 0});
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
   * @param amount
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
   * @param n
   */
  set(n: number) {
    this.setState({value: this.clamp(n), active: true});
  }

  /**
   * Set config
   * @param config
   */
  setConfig(config: NgProgressConfig) {
    this._config.next({...this._config.value, ...config});
  }

  /**
   * Destroy progress reference
   */
  destroy() {
    this._worker.unsubscribe();
    this._trickling.complete();
    this._state.complete();
    this._config.complete();
    this.deleteInstance();
  }

  /**
   * Set progress state
   * @param state
   */
  private setState(state: NgProgressState) {
    this._state.next({...this.currState, ...state});
  }

  /**
   * Clamps a value to be between min and max
   * @param n
   */
  private clamp(n: number): number {
    return Math.max(this._config.value.min, Math.min(this._config.value.max, n));
  }

  /**
   * Keeps incrementing the progress
   * @param config
   */
  private onTrickling(config: NgProgressConfig): Observable<number> {
    if (!this.isStarted) {
      this.set(this._config.value.min);
    }
    return timer(0, config.trickleSpeed).pipe(tap(() => this.inc()));
  }

  /**
   * Completes then resets the progress
   * @param config
   */
  private onComplete(config: NgProgressConfig): Observable<any> {
    return !this.isStarted ? of({}) : of({}).pipe(
      // Completes the progress
      tap(() => this.setState({value: 100})),

      // Hides the progress bar after a tiny delay
      delay(config.speed * 1.7),
      tap(() => this.setState({active: false})),

      // Resets the progress state
      delay(config.speed),
      tap(() => this.setState({value: 0}))
    );
  }
}

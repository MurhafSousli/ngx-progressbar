import { Injectable, inject, signal, effect, computed, OnDestroy, Signal, WritableSignal, EffectCleanupRegisterFn } from '@angular/core';
import {
  Observable,
  Subject,
  Subscription,
  of,
  tap,
  delay,
  timer,
  switchMap,
  finalize,
  takeUntil,
  EMPTY
} from 'rxjs';
import { NgProgressConfig, NG_PROGRESS_CONFIG } from './ng-progress.model';
import { defaultConfig } from './ng-progress-default';

@Injectable()
export class NgProgressRef implements OnDestroy {

  private readonly _config: WritableSignal<NgProgressConfig> = signal<NgProgressConfig>({
    ...defaultConfig,
    ...inject(NG_PROGRESS_CONFIG, { optional: true })
  });

  private _progress: WritableSignal<number> = signal<number>(0);

  private _active: WritableSignal<boolean> = signal<boolean>(false);

  active: Signal<boolean> = computed(() => this._active());

  progress: Signal<number> = computed(() => this._progress());

  config: Signal<NgProgressConfig> = computed(() => this._config());

  private readonly _trigger: WritableSignal<boolean> = signal<boolean>(false);

  // Progress start source event (used to cancel finalizing delays)
  private readonly _started: Subject<void> = new Subject<void>();
  readonly started: Observable<void> = this._started.asObservable();

  // Progress ended source event
  private readonly _completed: Subject<void> = new Subject<void>();
  readonly completed: Observable<void> = this._completed.asObservable();

  // Stream that increments and updates the progress _state
  private readonly _trickling: Subject<{ start?: boolean, config?: NgProgressConfig }> = new Subject<{
    start?: boolean,
    config?: NgProgressConfig
  }>();

  constructor() {
    let sub$: Subscription;
    effect((onCleanup: EffectCleanupRegisterFn) => {
      sub$?.unsubscribe();

      if (this._trigger()) {
        sub$ = timer(this.config().debounceTime).pipe(
          switchMap(() => this.onTrickling(this.config()))
        ).subscribe();
      } else {
        sub$ = this.onComplete(this.config()).subscribe();
      }

      onCleanup(() => {
        sub$?.unsubscribe();
      });
    }, {allowSignalWrites: true});
  }

  ngOnDestroy(): void {
    // Clean up
    this._trickling.complete();
  }

  /**
   * Start the progress
   */
  start(): void {
    this._started.next();
    this._trigger.set(true);
    this._active.set(true);
  }

  /**
   * Complete the progress
   */
  complete(): void {
    this._trigger.set(false);
  }

  /**
   * Increment the progress
   */
  inc(amount?: number): void {
    const n: number = this.progress();
    if (!this.active()) {
      this.start();
    } else {
      if (typeof amount !== 'number') {
        amount = this.config().trickleFunc(n);
      }
      this.set(n + amount);
    }
  }

  /**
   * Set the progress
   */
  set(n: number): void {
    this._progress.set(this.clamp(n));
  }

  /**
   * Set config
   */
  setConfig(config: NgProgressConfig): void {
    this._config.set({ ...this.config(), ...config });
  }

  /**
   * Clamps a value to be between min and max
   */
  private clamp(n: number): number {
    return Math.max(this.config().min, Math.min(this.config().max, n));
  }

  /**
   * Keeps incrementing the progress
   */
  private onTrickling(config: NgProgressConfig): Observable<number> {
    if (!this.active()) {
      this.set(this.config().min);
    }
    return timer(0, config.trickleSpeed).pipe(tap(() => this.inc()));
  }

  /**
   * Completes then resets the progress
   */
  private onComplete(config: NgProgressConfig): Observable<unknown> {
    if (!this.active()) {
      return EMPTY;
    }

    // Emit completed
    this._completed.next();

    return of({}).pipe(
      // Complete the progress
      tap(() => this._progress.set(100)),

      // Deactivate the progress after a tiny delay
      delay(config.speed * 1.7),
      tap(() => this._active.set(false)),

      // Use a tiny delay before resetting
      delay(config.speed),
      // Force the progress to reset even it got cancelled
      finalize(() => this._progress.set(0)),
      // Cancel any of the finalizing delays if the progress has started again
      takeUntil(this._started)
    );
  }
}

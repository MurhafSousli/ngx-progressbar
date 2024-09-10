import {
  Directive,
  inject,
  signal,
  effect,
  computed,
  untracked,
  Signal,
  WritableSignal,
  EffectCleanupRegisterFn
} from '@angular/core';
import {
  Observable,
  Subject,
  Subscription,
  BehaviorSubject,
  of,
  tap,
  delay,
  timer,
  switchMap,
  finalize,
  takeUntil,
  EMPTY
} from 'rxjs';
import { NgProgressOptions, NG_PROGRESS_OPTIONS } from './ng-progress.model';

enum TriggerType {
  START = 'START',
  COMPLETE = 'COMPLETE'
}

@Directive({
  standalone: true,
  selector: '[ngProgressRef]',
  exportAs: 'ngProgressRef'
})
export class NgProgressRef {

  private readonly _config: WritableSignal<NgProgressOptions> = signal<NgProgressOptions>(inject(NG_PROGRESS_OPTIONS));

  private _progress: WritableSignal<number> = signal<number>(0);

  private _active: WritableSignal<boolean> = signal<boolean>(false);

  active: Signal<boolean> = computed(() => this._active());

  progress: Signal<number> = computed(() => this._progress());

  config: Signal<NgProgressOptions> = computed(() => this._config());

  private _trigger: BehaviorSubject<TriggerType> = new BehaviorSubject<TriggerType>(null);

  // Progress start source event (used to cancel onComplete delays)
  private readonly _started: Subject<void> = new Subject<void>();
  readonly started: Observable<void> = this._started.asObservable();

  // Progress ended source event
  private readonly _completed: Subject<void> = new Subject<void>();
  readonly completed: Observable<void> = this._completed.asObservable();

  constructor() {
    let sub$: Subscription;
    effect((onCleanup: EffectCleanupRegisterFn) => {
      const config: NgProgressOptions = this.config();

      untracked(() => {
        sub$?.unsubscribe();

        sub$ = this._trigger.pipe(
          switchMap((trigger: TriggerType) => {
            if (trigger === TriggerType.START) {
              return timer(config.debounceTime).pipe(
                switchMap(() => this.onTrickling(config))
              );
            } else if (trigger === TriggerType.COMPLETE) {
              return this.onComplete(config);
            }
            return EMPTY;
          })
        ).subscribe();
      })

      onCleanup(() => sub$?.unsubscribe());
    });
  }

  /**
   * Start the progress
   */
  start(): void {
    this._started.next();
    this._trigger.next(TriggerType.START);
    this._active.set(true);
  }

  /**
   * Complete the progress
   */
  complete(): void {
    this._trigger.next(TriggerType.COMPLETE);
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
    this._active.set(true);
    this._progress.set(this.clamp(n));
  }

  /**
   * Set config
   */
  setConfig(config: NgProgressOptions): void {
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
  private onTrickling(config: NgProgressOptions): Observable<number> {
    if (!this.active()) {
      this.set(config.min);
    }
    return timer(0, config.trickleSpeed).pipe(tap(() => this.inc()));
  }

  /**
   * Completes then resets the progress
   */
  private onComplete(config: NgProgressOptions): Observable<unknown> {
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

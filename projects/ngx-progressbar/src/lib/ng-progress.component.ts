import {
  Component,
  inject,
  effect,
  computed,
  untracked,
  numberAttribute,
  booleanAttribute,
  input,
  Signal,
  InputSignal,
  OutputRef,
  ChangeDetectionStrategy,
  InputSignalWithTransform
} from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { NgProgressRef } from './ng-progress-ref';
import { NG_PROGRESS_OPTIONS, NgProgressOptions } from './ng-progress.model';

@Component({
  standalone: true,
  selector: 'ng-progress',
  exportAs: 'ngProgress',
  host: {
    'role': 'progressbar',
    '[class.ng-progress-bar]': 'true',
    '[class.ng-progress-bar-active]': 'progressRef.active()',
    '[class.ng-progress-bar-relative]': 'relative()',
    '[attr.spinnerPosition]': 'spinnerPosition()',
    '[attr.direction]': 'direction()',
    '[style.--_ng-progress-speed]': 'this.speed() + "ms"'
  },
  template: `
    <div class="ng-progress-bar-wrapper">
      <div class="ng-bar-placeholder">
        <div class="ng-bar" [style.transform]="progressTransform()">
          @if (!flat()) {
            <div class="ng-meteor"></div>
          }
        </div>
      </div>
      @if (spinner()) {
        <div class="ng-spinner">
          <div class="ng-spinner-icon"></div>
        </div>
      }
    </div>
  `,
  providers: [NgProgressRef],
  styleUrl: './ng-progress.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgProgressbar {

  private readonly config: NgProgressOptions = inject(NG_PROGRESS_OPTIONS);

  /** Progress bar worker */
  progressRef: NgProgressRef = inject(NgProgressRef, { host: true, self: true });

  /** Initializes inputs from the global config */
  min: InputSignalWithTransform<number, number | string> = input<number, number | string>(this.config.min, { transform: numberAttribute });
  max: InputSignalWithTransform<number, number | string> = input<number, number | string>(this.config.max, { transform: numberAttribute });
  speed: InputSignalWithTransform<number, number | string> = input<number, number | string>(this.config.speed, { transform: numberAttribute });
  trickleSpeed: InputSignalWithTransform<number, number | string> = input<number, number | string>(this.config.trickleSpeed, { transform: numberAttribute });
  debounceTime: InputSignalWithTransform<number, number | string> = input<number, number | string>(this.config.debounceTime, { transform: numberAttribute });

  flat: InputSignalWithTransform<boolean, boolean | string> = input<boolean, boolean | string>(this.config.flat, { transform: booleanAttribute });
  spinner: InputSignalWithTransform<boolean, boolean | string> = input<boolean, boolean | string>(this.config.spinner, { transform: booleanAttribute });
  relative: InputSignalWithTransform<boolean, boolean | string> = input<boolean, boolean | string>(this.config.relative, { transform: booleanAttribute });

  trickleFunc: InputSignal<(n: number) => number> = input(this.config.trickleFunc);
  spinnerPosition: InputSignal<'left' | 'right'> = input(this.config.spinnerPosition);
  direction: InputSignal<'ltr+' | 'ltr-' | 'rtl+' | 'rtl-'> = input(this.config.direction);

  progressTransform: Signal<string> = computed(() => {
    return `translate3d(${ this.progressRef.progress() }%,0,0)`;
  });

  started: OutputRef<void> = outputFromObservable<void>(this.progressRef.started);

  completed: OutputRef<void> = outputFromObservable<void>(this.progressRef.completed);

  constructor() {
    effect(() => {
      const config: NgProgressOptions = {
        max: (this.max() > 0 && this.max() <= 100) ? this.max() : 100,
        min: (this.min() < 100 && this.min() >= 0) ? this.min() : 0,
        speed: this.speed(),
        trickleSpeed: this.trickleSpeed(),
        trickleFunc: this.trickleFunc(),
        debounceTime: this.debounceTime()
      };
      // Update progress bar config when inputs change
      untracked(() => this.progressRef.setConfig(config));
    });
  }

  start(): void {
    this.progressRef.start();
  }

  complete(): void {
    this.progressRef.complete();
  }

  inc(n?: number): void {
    this.progressRef.inc(n);
  }

  set(n: number): void {
    this.progressRef.set(n);
  }
}

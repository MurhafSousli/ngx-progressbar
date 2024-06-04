import {
  Component,
  inject,
  effect,
  computed,
  numberAttribute,
  booleanAttribute,
  input,
  Signal,
  InputSignal,
  OutputRef,
  ChangeDetectionStrategy,
  InputSignalWithTransform
} from '@angular/core';
import { NgProgressRef } from './ng-progress-ref';
import { NG_PROGRESS_CONFIG, NgProgressConfig } from './ng-progress.model';
import { defaultConfig } from './ng-progress-default';
import { outputFromObservable } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  selector: 'ng-progress',
  host: {
    'role': 'progressbar',
    '[attr.spinnerPosition]': 'spinnerPosition()',
    '[attr.direction]': 'direction()',
    '[attr.thick]': 'thick()',
    '[attr.fixed]': 'fixed()'
  },
  template: `
    <div #progressbarWrapper
         class="ng-progress-bar"
         [attr.active]="progressRef.active()"
         [style.transition]="wrapperTransition()">
      <div class="ng-bar-placeholder">
        <div #progressbar
             class="ng-bar"
             [style.transform]="progressTransform()"
             [style.transition]="progressTransition()"
             [style.background-color]="color()">
          @if (meteor()) {
            <div class="ng-meteor" [style.box-shadow]="meteorBoxShadow()"></div>
          }
        </div>
      </div>
      @if (spinner()) {
        <div class="ng-spinner">
          <div class="ng-spinner-icon"
               [style.border-top-color]="color()"
               [style.border-left-color]="color()"></div>
        </div>
      }
    </div>
  `,
  providers: [NgProgressRef],
  styleUrl: './ng-progress.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgProgressbar {

  private readonly config: NgProgressConfig = { ...defaultConfig, ...inject(NG_PROGRESS_CONFIG, { optional: true }) };

  /** Progress bar worker */
  progressRef: NgProgressRef = inject(NgProgressRef, { host: true });

  /** Creates a new instance if id is not already exists */
  id: InputSignal<string> = input('root');

  /** Initializes inputs from the global config */
  min: InputSignalWithTransform<number, number | string> = input<number, number | string>(this.config.min, { transform: numberAttribute });
  max: InputSignalWithTransform<number, number | string> = input<number, number | string>(this.config.max, { transform: numberAttribute });
  speed: InputSignalWithTransform<number, number | string> = input<number, number | string>(this.config.speed, { transform: numberAttribute });
  trickleSpeed: InputSignalWithTransform<number, number | string> = input<number, number | string>(this.config.trickleSpeed, { transform: numberAttribute });
  debounceTime: InputSignalWithTransform<number, number | string> = input<number, number | string>(this.config.debounceTime, { transform: numberAttribute });

  thick: InputSignalWithTransform<boolean, boolean | string> = input<boolean, boolean | string>(this.config.thick, { transform: booleanAttribute });
  fixed: InputSignalWithTransform<boolean, boolean | string> = input<boolean, boolean | string>(this.config.fixed, { transform: booleanAttribute });
  meteor: InputSignalWithTransform<boolean, boolean | string> = input<boolean, boolean | string>(this.config.meteor, { transform: booleanAttribute });
  spinner: InputSignalWithTransform<boolean, boolean | string> = input<boolean, boolean | string>(this.config.spinner, { transform: booleanAttribute });

  ease: InputSignal<string> = input(this.config.ease);
  color: InputSignal<string> = input(this.config.color);
  trickleFunc: InputSignal<(n: number) => number> = input(this.config.trickleFunc);
  spinnerPosition: InputSignal<'left' | 'right'> = input(this.config.spinnerPosition);
  direction: InputSignal<'ltr+' | 'ltr-' | 'rtl+' | 'rtl-'> = input(this.config.direction);

  wrapperTransition: Signal<string> = computed(() => {
    return `opacity ${ this.speed() } ms ${ this.ease() }`;
  });

  meteorBoxShadow: Signal<string> = computed(() => {
    return `0 0 10px ${ this.color() }, 0 0 5px ${ this.color() }`;
  });

  progressTransform: Signal<string> = computed(() => {
    return `translate3d(${ this.progressRef.progress() }%,0,0)`;
  });

  progressTransition: Signal<string> = computed(() => {
    return this.progressRef.active() ? `all ${ this.speed() }ms ${ this.ease() }` : 'none';
  });

  started: OutputRef<void> = outputFromObservable<void>(this.progressRef.started);

  completed: OutputRef<void> = outputFromObservable<void>(this.progressRef.completed);

  get active(): Signal<boolean> {
    return this.progressRef.active;
  }

  constructor() {
    effect(() => {
      setTimeout(() => {
        // Update progress bar config when inputs change
        this.progressRef.setConfig({
          max: (this.max() > 0 && this.max() <= 100) ? this.max() : 100,
          min: (this.min() < 100 && this.min() >= 0) ? this.min() : 0,
          speed: this.speed(),
          trickleSpeed: this.trickleSpeed(),
          trickleFunc: this.trickleFunc(),
          debounceTime: this.debounceTime()
        });
      });
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

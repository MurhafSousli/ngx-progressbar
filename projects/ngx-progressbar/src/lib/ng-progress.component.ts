import {
  Component,
  inject,
  computed,
  booleanAttribute,
  input,
  Signal,
  InputSignal,
  ChangeDetectionStrategy,
  InputSignalWithTransform
} from '@angular/core';
import { NgProgressRef } from './ng-progress-ref';
import { NG_PROGRESS_OPTIONS, NgProgressOptions } from './ng-progress.model';

@Component({
  selector: 'ng-progress',
  exportAs: 'ngProgress',
  host: {
    'role': 'progressbar',
    '[class.ng-progress-bar]': 'true',
    '[class.ng-progress-bar-active]': 'progressRef.active()',
    '[class.ng-progress-bar-relative]': 'relative()',
    '[attr.spinnerPosition]': 'spinnerPosition()',
    '[attr.direction]': 'direction()',
    '[style.--_ng-progress-speed]': 'progressRef.speed() + "ms"',
    '[style.--_ng-progress-fade-out-speed]': 'progressRef.fadeOutSpeed() + "ms"'
  },
  hostDirectives: [{
    directive: NgProgressRef,
    inputs: ['min', 'max', 'speed', 'trickleSpeed', 'fadeOutSpeed', 'debounceTime'],
    outputs: ['started', 'completed']
  }],
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
  styleUrl: './ng-progress.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgProgressbar {

  private readonly config: NgProgressOptions = inject(NG_PROGRESS_OPTIONS);

  /** Progress bar worker */
  progressRef: NgProgressRef = inject(NgProgressRef, { host: true, self: true });

  flat: InputSignalWithTransform<boolean, boolean | string> = input<boolean, boolean | string>(this.config.flat, { transform: booleanAttribute });
  spinner: InputSignalWithTransform<boolean, boolean | string> = input<boolean, boolean | string>(this.config.spinner, { transform: booleanAttribute });
  relative: InputSignalWithTransform<boolean, boolean | string> = input<boolean, boolean | string>(this.config.relative, { transform: booleanAttribute });
  spinnerPosition: InputSignal<'left' | 'right'> = input<'left' | 'right'>(this.config.spinnerPosition);
  direction: InputSignal<'ltr+' | 'ltr-' | 'rtl+' | 'rtl-'> = input<'ltr+' | 'ltr-' | 'rtl+' | 'rtl-'>(this.config.direction);

  progressTransform: Signal<string> = computed(() => {
    return `translate3d(${ this.progressRef.progress() }%,0,0)`;
  });
}

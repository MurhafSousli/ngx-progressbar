import { InjectionToken, Provider } from '@angular/core';
import { defaultOptions } from './ng-progress-default';

export interface NgProgressOptions {
  spinnerPosition?: 'left' | 'right';
  direction?: 'ltr+' | 'ltr-' | 'rtl+' | 'rtl-';
  relative?: boolean;
  flat?: boolean;
  spinner?: boolean;
  max?: number;
  min?: number;
  speed?: number;
  trickleSpeed?: number;
  trickleFunc?: (n: number) => number;
  debounceTime?: number;
}

export const NG_PROGRESS_OPTIONS: InjectionToken<NgProgressOptions> = new InjectionToken<NgProgressOptions>('NG_PROGRESS_OPTIONS', {
  providedIn: 'root',
  factory: () => defaultOptions
});

export function provideNgProgressOptions(options: NgProgressOptions): Provider {
  return {
    provide: NG_PROGRESS_OPTIONS,
    useValue: { ...defaultOptions, ...options }
  };
}

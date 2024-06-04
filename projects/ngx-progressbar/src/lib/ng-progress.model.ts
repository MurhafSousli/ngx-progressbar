import { InjectionToken, Provider } from '@angular/core';

export interface NgProgressConfig {
  spinnerPosition?: 'left' | 'right';
  direction?: 'ltr+' | 'ltr-' | 'rtl+' | 'rtl-';
  ease?: string;
  color?: string;
  thick?: boolean;
  fixed?: boolean;
  meteor?: boolean;
  spinner?: boolean;
  max?: number;
  min?: number;
  speed?: number;
  trickleSpeed?: number;
  trickleFunc?: (n: number) => number;
  debounceTime?: number;
}

export const NG_PROGRESS_CONFIG: InjectionToken<NgProgressConfig> = new InjectionToken<NgProgressConfig>('ngProgressConfig');

export function provideNgProgressConfig(config: NgProgressConfig): Provider {
  return {
    provide: NG_PROGRESS_CONFIG,
    useValue: config,
  }
}

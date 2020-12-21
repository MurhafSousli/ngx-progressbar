import { InjectionToken } from '@angular/core';

export interface ProgressState {
  active: boolean;
  value: number;
}

export interface ProgressConfig {
  spinnerPosition: 'left' | 'right';
  direction: 'ltr+' | 'ltr-' | 'rtl+' | 'rtl-';
  ease: string;
  color: string;
  thick: boolean;
  fixed: boolean;
  meteor: boolean;
  spinner: boolean;
  max: number;
  min: number;
  speed: number;
  trickleSpeed: number;
  trickleFunc: (n: number) => number;
  debounceTime: number;
}

export type NgProgressState = Partial<ProgressState>;

export type NgProgressConfig = Partial<ProgressConfig>;

export const NG_PROGRESS_CONFIG = new InjectionToken<NgProgressConfig>('ngProgressConfig');

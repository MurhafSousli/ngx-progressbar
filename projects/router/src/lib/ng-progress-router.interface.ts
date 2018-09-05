import { InjectionToken } from '@angular/core';

export interface NgProgressRouterConfig {
  id?: string;
  delay?: number;
}

export const CONFIG = new InjectionToken<NgProgressRouterConfig>('config');

import { InjectionToken, Type } from '@angular/core';
import { RouterEvent } from '@angular/router';

export interface NgProgressRouterConfig {
  id?: string;
  delay?: number;
  startEvents?: Type<RouterEvent>[];
  completeEvents?: Type<RouterEvent>[];
}

export const CONFIG = new InjectionToken<NgProgressRouterConfig>('config');

import { InjectionToken, Type } from '@angular/core';
import { RouterEvent } from '@angular/router';

export interface ProgressRouterConfig {
  id: string;
  delay: number;
  startEvents: Type<RouterEvent>[];
  completeEvents: Type<RouterEvent>[];
}

export type NgProgressRouterConfig = Partial<ProgressRouterConfig>;

export const NG_PROGRESS_ROUTER_CONFIG = new InjectionToken<NgProgressRouterConfig>('ngProgressRouterConfig');

import { InjectionToken, Provider, Type } from '@angular/core';
import { RouterEvent } from '@angular/router';
import { NgProgressRouterBase } from './ng-progress-router-base.service';

export interface NgProgressRouterConfig {
  delay?: number;
  startEvents?: Type<RouterEvent>[];
  completeEvents?: Type<RouterEvent>[];
}

export const NG_PROGRESS_ROUTER_CONFIG: InjectionToken<NgProgressRouterConfig> = new InjectionToken<NgProgressRouterConfig>('ngProgressRouterConfig');

export function provideNgProgressRouterConfig(config: NgProgressRouterConfig): Provider {
  return {
    provide: NG_PROGRESS_ROUTER_CONFIG,
    useValue: config,
  }
}

export function provideNgProgressRouterService(config?: NgProgressRouterConfig): Provider {
  return [
    {
      provide: NG_PROGRESS_ROUTER_CONFIG,
      useValue: config,
    },
    NgProgressRouterBase
  ]
}

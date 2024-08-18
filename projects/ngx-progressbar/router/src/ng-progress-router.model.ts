import { InjectionToken, Provider, Type } from '@angular/core';
import { RouterEvent } from '@angular/router';
import { defaultRouterOptions } from './ng-progress-router-default';

export interface NgProgressRouterOptions {
  minDuration?: number;
  startEvents?: Type<RouterEvent>[];
  completeEvents?: Type<RouterEvent>[];
}

export const NG_PROGRESS_ROUTER_OPTIONS: InjectionToken<NgProgressRouterOptions> = new InjectionToken<NgProgressRouterOptions>('NG_PROGRESS_ROUTER_OPTIONS', {
  providedIn: 'root',
  factory: () => defaultRouterOptions
});

export function provideNgProgressRouter(options: NgProgressRouterOptions): Provider {
  return {
    provide: NG_PROGRESS_ROUTER_OPTIONS,
    useValue: { ...defaultRouterOptions, ...options },
  }
}

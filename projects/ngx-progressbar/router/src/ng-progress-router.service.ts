import { Injectable, Optional, Inject, Type } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RouterEvent, Event } from '@angular/router';
import { of, tap, delay, switchMap, filter } from 'rxjs';
import { NgProgress, NgProgressRef } from 'ngx-progressbar';
import { NgProgressRouterConfig, ProgressRouterConfig, NG_PROGRESS_ROUTER_CONFIG } from './ng-progress-router.interface';

/**
 * Check if a router event type exists in an array of router event types
 */
function eventExists(routerEvent: Event, events: Type<RouterEvent>[]): boolean {
  let res = false;
  events.map((event: Type<RouterEvent>) => res = res || routerEvent instanceof event);
  return res;
}

@Injectable({
  providedIn: 'root'
})
export class NgProgressRouter {
  private readonly _config: ProgressRouterConfig = {
    id: 'root',
    delay: 0,
    startEvents: [NavigationStart],
    completeEvents: [NavigationEnd, NavigationCancel, NavigationError]
  };

  constructor(progress: NgProgress, router: Router, @Optional() @Inject(NG_PROGRESS_ROUTER_CONFIG) config: NgProgressRouterConfig) {
    this._config = config ? {...this._config, ...config} : this._config;
    const progressRef: NgProgressRef = progress.ref(this._config.id);

    const startProgress = of({}).pipe(
      tap(() => progressRef.start())
    );

    const completeProgress = of({}).pipe(
      delay(this._config.delay),
      tap(() => progressRef.complete())
    );

    const filterEvents: Type<RouterEvent>[] = [...this._config.startEvents, ...this._config.completeEvents];

    router.events.pipe(
      filter((event: Event) => eventExists(event, filterEvents)),
      switchMap((event: Event) => eventExists(event, this._config.startEvents) ? startProgress : completeProgress)
    ).subscribe();
  }
}

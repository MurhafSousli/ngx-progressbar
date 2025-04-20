import { Directive, inject, Type } from '@angular/core';
import { Event, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, map, tap } from 'rxjs';
import { NgProgressRef } from 'ngx-progressbar';
import { NG_PROGRESS_ROUTER_OPTIONS, NgProgressRouterOptions } from './ng-progress-router.model';

/**
 * Check if a router event type exists in an array of router event types
 */
function eventExists(routerEvent: Event, events: Type<Event>[]): boolean {
  return events.some((e: Type<Event>) => routerEvent instanceof e);
}

@Directive()
class NgProgressRouterBase {

  private readonly router: Router = inject(Router);

  private readonly config: NgProgressRouterOptions = inject(NG_PROGRESS_ROUTER_OPTIONS);

  readonly progressRef: NgProgressRef = inject(NgProgressRef, { host: true, self: true });

  constructor() {
    let completeTimeout: ReturnType<typeof setTimeout>;

    // Previously in v13, we had the router events toggle converted to a signal,
    // the issue with toSignal is when the new route is loaded too fast, it won't start the progressbar, causing the tests to break.
    // Therefore, we switched back to stream subscription to make sure it always starts and completes with the route events.
    this.router.events.pipe(
      filter((event: Event) => eventExists(event, [...this.config.startEvents, ...this.config.completeEvents])),
      map((event: Event) => eventExists(event, this.config.startEvents)),
      tap((toggle: boolean) => {
        clearTimeout(completeTimeout);
        if (toggle) {
          this.progressRef.start();
        } else {
          completeTimeout = setTimeout(() => {
            this.progressRef.complete();
          }, this.config.minDuration);
        }
      }),
      takeUntilDestroyed()
    ).subscribe();
  }
}

@Directive({
  selector: 'ng-progress[ngProgressRouter]'
})
export class NgProgressRouter extends NgProgressRouterBase {
}

@Directive({
  selector: '[ngProgressRouter]:not(ng-progress)',
  hostDirectives: [NgProgressRef]
})
export class NgProgressRouterRef extends NgProgressRouterBase {
}

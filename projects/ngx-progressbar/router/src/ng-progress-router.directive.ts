import { Directive, inject, Type, effect, untracked, Signal, EffectCleanupRegisterFn } from '@angular/core';
import { Event, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
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

  private readonly routerToggleEvent: Signal<boolean> = toSignal<boolean>(
    this.router.events.pipe(
      filter((event: Event) => eventExists(event, [...this.config.startEvents, ...this.config.completeEvents])),
      map((event: Event) => eventExists(event, this.config.startEvents))
    )
  );

  constructor() {
    effect((onCleanup: EffectCleanupRegisterFn) => {
      const toggle: boolean = this.routerToggleEvent();
      let completeTimeout: ReturnType<typeof setTimeout>;

      untracked(() => {
        if (toggle) {
          this.progressRef.start();
        } else {
          completeTimeout = setTimeout(() => {
            this.progressRef.complete();
          }, this.config.minDuration);
        }

        onCleanup(() => clearTimeout(completeTimeout));
      });
    });
  }
}

@Directive({
  standalone: true,
  selector: 'ng-progress[ngProgressRouter]'
})
export class NgProgressRouter extends NgProgressRouterBase {
}

@Directive({
  standalone: true,
  selector: '[ngProgressRouter]:not(ng-progress)',
  hostDirectives: [NgProgressRef]
})
export class NgProgressRouterRef extends NgProgressRouterBase {
}

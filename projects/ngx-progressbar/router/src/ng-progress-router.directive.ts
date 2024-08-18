import { Directive, inject, Type, OnInit, OnDestroy } from '@angular/core';
import { Event, Router, RouterEvent } from '@angular/router';
import { Observable, Subscription, of, delay, filter, switchMap, tap } from 'rxjs';
import { NgProgressRef } from 'ngx-progressbar';
import { NG_PROGRESS_ROUTER_OPTIONS, NgProgressRouterOptions } from './ng-progress-router.model';

/**
 * Check if a router event type exists in an array of router event types
 */
function eventExists(routerEvent: Event, events: Type<RouterEvent>[]): boolean {
  let res: boolean = false;
  events.map((event: Type<RouterEvent>) => res = res || routerEvent instanceof event);
  return res;
}

@Directive()
class NgProgressRouterBase implements OnInit, OnDestroy {

  private subscription: Subscription;

  private readonly router: Router = inject(Router);

  readonly progressRef: NgProgressRef = inject(NgProgressRef, { host: true, self: true });

  private readonly config: NgProgressRouterOptions = inject(NG_PROGRESS_ROUTER_OPTIONS);

  ngOnInit(): void {
    const startProgress: Observable<unknown> = of({}).pipe(
      tap(() => this.progressRef.start())
    );

    const completeProgress: Observable<unknown> = of({}).pipe(
      delay(this.config.minDuration),
      tap(() => this.progressRef.complete())
    );

    const filterEvents: Type<RouterEvent>[] = [...this.config.startEvents, ...this.config.completeEvents];

    this.subscription = this.router.events.pipe(
      filter((event: Event) => eventExists(event, filterEvents)),
      switchMap((event: Event) => eventExists(event, this.config.startEvents) ? startProgress : completeProgress)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
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

import { Injectable, OnInit, Type } from '@angular/core';
import { delay, filter, Observable, of, switchMap, tap } from 'rxjs';
import { Event, Router, RouterEvent } from '@angular/router';
import { NgProgressRef } from 'ngx-progressbar';
import { NgProgressRouterConfig } from './ng-progress-router.model';

/**
 * Check if a router event type exists in an array of router event types
 */
function eventExists(routerEvent: Event, events: Type<RouterEvent>[]): boolean {
  let res: boolean = false;
  events.map((event: Type<RouterEvent>) => res = res || routerEvent instanceof event);
  return res;
}

@Injectable()
export abstract class NgProgressRouterBase implements OnInit {

  protected abstract readonly router: Router;

  protected abstract readonly progressRef: NgProgressRef;

  protected abstract readonly config: NgProgressRouterConfig;

  ngOnInit(): void {
    const startProgress: Observable<unknown> = of({}).pipe(
      tap(() => this.progressRef.start())
    );

    const completeProgress: Observable<unknown> = of({}).pipe(
      delay(this.config.delay),
      tap(() => this.progressRef.complete())
    );

    const filterEvents: Type<RouterEvent>[] = [...this.config.startEvents, ...this.config.completeEvents];

    this.router.events.pipe(
      filter((event: Event) => eventExists(event, filterEvents)),
      switchMap((event: Event) => eventExists(event, this.config.startEvents) ? startProgress : completeProgress)
    ).subscribe();
  }
}

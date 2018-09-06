import { Injectable, Optional, Inject } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { of } from 'rxjs';
import { tap, delay, switchMap, filter } from 'rxjs/operators';
import { NgProgress } from '@ngx-progressbar/core';
import { NgProgressRouterConfig, CONFIG } from './ng-progress-router.interface';

@Injectable({
  providedIn: 'root'
})
export class NgProgressRouter {
  private readonly _config: NgProgressRouterConfig = {
    id: 'root',
    delay: 0
  };

  constructor(progress: NgProgress, router: Router, @Optional() @Inject(CONFIG) config: NgProgressRouterConfig) {
    this._config = {...this._config, ...config};
    const progressRef = progress.ref(this._config.id);

    const startProgress = of({}).pipe(
      tap(() => progressRef.start())
    );

    const completeProgress = of({}).pipe(
      delay(this._config.delay),
      tap(() => progressRef.complete())
    );

    router.events.pipe(
      filter((event) =>
        event instanceof NavigationStart ||
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ),
      switchMap(event => (event instanceof NavigationStart) ? startProgress : completeProgress)
    ).subscribe();
  }
}

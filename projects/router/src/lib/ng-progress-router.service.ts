import { Injectable, Optional, Inject } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { of, EMPTY } from 'rxjs';
import { tap, delay, switchMap } from 'rxjs/operators';
import { NgProgress } from '@ngx-progressbar/core';
import { NgProgressRouterConfig, CONFIG } from './ng-progress-router.interface';

@Injectable({
  providedIn: 'root'
})
export class NgProgressRouter {
  private _config: NgProgressRouterConfig = {
    id: 'root',
    delay: 0
  };

  constructor(progress: NgProgress, router: Router, @Optional() @Inject(CONFIG) config: NgProgressRouterConfig) {
    this._config = { ...this._config, ...config };
    const progressRef = progress.ref(this._config.id);

    const startProgress = of({}).pipe(tap(() => progressRef.start()));

    const completeProgress = of({}).pipe(
      delay(config.delay),
      tap(() => progressRef.complete())
    );

    router.events.pipe(
      switchMap(event => {
        if (event instanceof NavigationStart) {
          return startProgress;
        } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
          return completeProgress;
        }
        return EMPTY;
      })
    ).subscribe();
  }
}

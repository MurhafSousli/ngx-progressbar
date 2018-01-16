import { NgModule } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { NgProgress } from '@ngx-progressbar/core';

@NgModule({})
export class NgProgressRouterModule {

  constructor(progress: NgProgress, router: Router) {

    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        progress.start();
      }

      if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        progress.complete();
      }
    });
  }
}

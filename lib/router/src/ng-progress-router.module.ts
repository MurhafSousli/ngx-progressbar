import { NgModule } from '@angular/core';
import { Router, NavigationStart, NavigationError, NavigationEnd, NavigationCancel } from '@angular/router';
import { NgProgressModule, NgProgress } from '@ngx-progressbar/core';

@NgModule({
})
export class NgProgressRouterModule {
  constructor(router: Router, progress: NgProgress) {

    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        progress.start();
      }

      if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        progress.done();
      }
    });
  }
}

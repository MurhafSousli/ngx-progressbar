import { Directive, effect, inject, untracked } from '@angular/core';
import { NgProgressRef } from 'ngx-progressbar';
import { NgProgressHttpManager } from './ng-progress-http-manager';

@Directive()
class NgProgressHttpBase {

  private readonly manager: NgProgressHttpManager = inject(NgProgressHttpManager);

  private readonly progressRef: NgProgressRef = inject(NgProgressRef, { host: true, self: true });

  constructor() {
    let initial: boolean = true;
    effect(() => {
      const requestLoading: boolean = this.manager.requestsLoading();
      // Ignore the initial execution if loading state is false
      if (initial) {
        initial = false;
        if (!requestLoading) return;
      }

      untracked(() => {
        if (requestLoading) {
          this.progressRef.start();
        } else if (this.progressRef.active()) {
          this.progressRef.complete();
        }
      });
    });
  }
}


@Directive({
  selector: 'ng-progress[ngProgressHttp]'
})
export class NgProgressHttp extends NgProgressHttpBase {
}

@Directive({
  selector: '[ngProgressHttp]:not(ng-progress)',
  hostDirectives: [NgProgressRef]
})
export class NgProgressHttpRef extends NgProgressHttpBase {
}


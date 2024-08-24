import { Directive, effect, inject } from '@angular/core';
import { NgProgressRef } from 'ngx-progressbar';
import { NgProgressHttpManager } from './ng-progress-http-manager';

@Directive()
class NgProgressHttpBase {

  private readonly manager: NgProgressHttpManager = inject(NgProgressHttpManager);

  private readonly progressRef: NgProgressRef = inject(NgProgressRef, { host: true, self: true });

  constructor() {
    effect(() => {
      if (this.manager.requestsLoading()) {
        this.progressRef.start();
      } else if (this.progressRef.isActive) {
        this.progressRef.complete();
      }
    }, { allowSignalWrites: true });
  }
}


@Directive({
  standalone: true,
  selector: 'ng-progress[ngProgressHttp]'
})
export class NgProgressHttp extends NgProgressHttpBase {
}

@Directive({
  standalone: true,
  selector: '[ngProgressHttp]:not(ng-progress)',
  hostDirectives: [NgProgressRef]
})
export class NgProgressHttpRef extends NgProgressHttpBase {
}


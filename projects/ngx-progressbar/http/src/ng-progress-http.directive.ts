import { Directive, effect, inject } from '@angular/core';
import { NgProgressRef } from 'ngx-progressbar';
import { NgProgressHttpManager } from './ng-progress-http-manager';

@Directive({
  standalone: true,
  selector: '[ngProgressHttp]'
})
export class NgProgressHttp {

  private readonly manager: NgProgressHttpManager = inject(NgProgressHttpManager);

  private readonly progressRef: NgProgressRef = inject(NgProgressRef, { host: true });

  constructor() {
    effect(() => {
      if (this.manager.requestsLoading()) {
        this.progressRef.start();
      } else {
        this.progressRef.complete();
      }
    }, { allowSignalWrites: true });
  }

}

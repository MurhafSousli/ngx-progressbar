import { Directive, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgProgressRef } from 'ngx-progressbar';
import { NgProgressRouterBase } from './ng-progress-router-base.service';
import { NG_PROGRESS_ROUTER_CONFIG, NgProgressRouterConfig } from './ng-progress-router.model';
import { defaultConfig } from './ng-progress-router-default';

@Directive({
  standalone: true,
  selector: '[ngProgressRouter]',
})
export class NgProgressRouter extends NgProgressRouterBase {

  protected readonly router: Router = inject(Router);

  protected readonly progressRef: NgProgressRef = inject(NgProgressRef, { host: true });

  protected readonly config: NgProgressRouterConfig = { ...defaultConfig, ...inject(NG_PROGRESS_ROUTER_CONFIG, { optional: true }) };

}

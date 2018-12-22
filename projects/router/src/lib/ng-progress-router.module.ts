import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgProgressRouterConfig, NG_PROGRESS_ROUTER_CONFIG } from './ng-progress-router.interface';
import { NgProgressRouter } from './ng-progress-router.service';

@NgModule({})
export class NgProgressRouterModule {

  // Inject the service to activate it
  constructor(ngProgressRouter: NgProgressRouter) {
  }

  static withConfig(config: NgProgressRouterConfig): ModuleWithProviders {
    return {
      ngModule: NgProgressRouterModule,
      providers: [
        { provide: NG_PROGRESS_ROUTER_CONFIG, useValue: config }
      ]
    };
  }
}

import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgProgressRouterConfig, CONFIG } from './ng-progress-router.interface';
import { NgProgressRouter } from './ng-progress-router.service';

@NgModule({})
export class NgProgressRouterModule {

  // Inject the service to activate it
  constructor(ngProgressRouter: NgProgressRouter) {
  }

  static forRoot(config?: NgProgressRouterConfig): ModuleWithProviders {
    return {
      ngModule: NgProgressRouterModule,
      providers: [
        { provide: CONFIG, useValue: config }
      ]
    };
  }
}

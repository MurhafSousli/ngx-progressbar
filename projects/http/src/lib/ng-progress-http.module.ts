import { NgModule, ModuleWithProviders } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgProgressInterceptor } from './ng-progress.interceptor';
import { NgProgressHttpConfig, CONFIG } from './ng-progress-http.interface';

@NgModule({
})
export class NgProgressHttpModule {
  static forRoot(config?: NgProgressHttpConfig): ModuleWithProviders {
    return {
      ngModule: NgProgressHttpModule,
      providers: [
        { provide: CONFIG, useValue: config },
        { provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true }
      ]
    };
  }
}

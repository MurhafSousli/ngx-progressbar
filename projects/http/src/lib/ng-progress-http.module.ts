import { NgModule, ModuleWithProviders } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgProgressInterceptor } from './ng-progress.interceptor';
import { NgProgressHttpConfig } from './ng-progress-http.interface';
import { CONFIG } from './ng-progress-http.token';

const defaultConfig: NgProgressHttpConfig = {
  silentApis: []
}

@NgModule({
})
export class NgProgressHttpModule {
  static forRoot(config?: NgProgressHttpConfig): ModuleWithProviders {
    config = {...defaultConfig, ...config};
    return {
      ngModule: NgProgressHttpModule,
      providers: [
        { provide: CONFIG, useValue: config },
        { provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true }
      ]
    };
  }
}

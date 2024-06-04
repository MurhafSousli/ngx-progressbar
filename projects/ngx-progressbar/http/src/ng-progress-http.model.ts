import { InjectionToken, Provider } from '@angular/core';

export interface NgProgressHttpConfig {
  silentApis?: string[];
  matcher?: string | undefined;
}

export const NG_PROGRESS_HTTP_CONFIG: InjectionToken<NgProgressHttpConfig> = new InjectionToken<NgProgressHttpConfig>('ngProgressHttpConfig');

export function provideNgProgressHttp(config?: NgProgressHttpConfig): Provider {
  return [
    {
      provide: NG_PROGRESS_HTTP_CONFIG,
      useValue: config,
    }
  ];
}

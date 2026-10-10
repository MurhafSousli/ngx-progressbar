import { InjectionToken, Provider } from '@angular/core';

export interface NgProgressHttpOptions {
  silentApis?: string[];
  matcher?: string | undefined;
}

export const NG_PROGRESS_HTTP_OPTIONS: InjectionToken<NgProgressHttpOptions> = new InjectionToken<NgProgressHttpOptions>('NG_PROGRESS_HTTP_OPTIONS', {
  providedIn: 'root',
  factory: () => null
});

export function provideNgProgressHttp(options: NgProgressHttpOptions): Provider {
  return [
    {
      provide: NG_PROGRESS_HTTP_OPTIONS,
      useValue: options
    }
  ];
}

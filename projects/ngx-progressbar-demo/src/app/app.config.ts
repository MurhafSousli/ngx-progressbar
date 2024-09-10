import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withHashLocation } from '@angular/router';
import { progressInterceptor } from 'ngx-progressbar/http';
import { appRoutes } from './app-routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withHashLocation()),
    provideAnimations(),
    provideHttpClient(
      withFetch(),
      withInterceptors([progressInterceptor])
    )
  ]
}

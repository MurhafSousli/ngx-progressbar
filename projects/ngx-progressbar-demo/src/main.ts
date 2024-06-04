import { enableProdMode, importProvidersFrom } from '@angular/core';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/routing.module';
import { progressInterceptor } from 'ngx-progressbar/http';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      AppRoutingModule
    ),
    provideAnimations(),
    provideHttpClient(
      withFetch(),
      withInterceptors([progressInterceptor])
    )
  ]
}).catch(err => console.error(err));

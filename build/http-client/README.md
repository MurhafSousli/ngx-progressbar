<p align="center">
  <img height="200px" width="200px" style="text-align: center;" src="https://cdn.rawgit.com/MurhafSousli/ngx-progressbar/79d7fbba96cc528238e67aadb85eafe8653198de/assets/logo.svg">
  <h1 align="center">A plug for HttpClient requests</h1>
</p>

Use this package to start and complete the progress bar on http requests, See [HttpClient stackblitz](https://stackblitz.com/edit/ngx-progressbar-httpclient)

## Install with npm

```bash
  npm install @ngx-progressbar/core @ngx-progressbar/http-client --save
```

## Import `NgProgressModule` and `NgProgressHttpClientModule`

```ts
import { HttpClientModule } from '@angular/common/http';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpClientModule } from '@ngx-progressbar/http-client';

@NgModule({
  imports: [
    HttpClientModule,
    NgProgressModule.forRoot(),
    NgProgressHttpClientModule
  ],
})
export class AppModule {
}

```

In your template

```html
<ng-progress></ng-progress>
```
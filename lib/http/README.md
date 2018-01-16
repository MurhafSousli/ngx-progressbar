<p align="center">
  <img height="200px" width="200px" style="text-align: center;" src="https://cdn.rawgit.com/MurhafSousli/ngx-progressbar/master/src/assets/logo.svg">
  <h1 align="center">A plug for HttpClient requests</h1>
</p>

Use this package to start and complete the progress bar on http requests, See [HttpClient stackblitz](https://stackblitz.com/edit/ngx-progressbar-http)

## Install with npm

```bash
  npm install @ngx-progressbar/core @ngx-progressbar/http --save
```

## Import `NgProgressModule` and `NgProgressHttpModule`

```ts
import { HttpClientModule } from '@angular/common/http';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';

@NgModule({
  imports: [
    HttpClientModule,
    NgProgressModule.forRoot(),
    NgProgressHttpModule
  ],
})
export class AppModule {
}

```

In your template

```html
<ng-progress></ng-progress>
```

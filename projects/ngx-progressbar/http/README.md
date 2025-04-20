## NgProgress + Http

The `ngProgressHttp` directive allows you to easily integrate the progress bar with your HTTP requests.

### Usage

To use the `ngProgressHttp` directive, simply add it to your component along with the `NgProgressbar` component:

```typescript
import { Component } from '@angular/core';
import { NgProgressbar } from 'ngx-progressbar';
import { NgProgressHttp } from 'ngx-progressbar/http';

@Component({
  selector: 'app-root',
  imports: [NgProgressbar, NgProgressHttp],
  template: `
    <ng-progress ngProgressHttp/>
  `
})
export class AppComponent {
}
```

However, in order for the `ngProgressHttp` directive to work, you need to provide the `progressInterceptor` in your application's bootstrap process:

```typescript
import { provideNgProgressHttp, progressInterceptor } from 'ngx-progressbar/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([progressInterceptor]))
  ]
});
```

This interceptor is responsible for tracking the progress of your HTTP requests and updating the progress bar accordingly.


### Ignoring HTTP Requests

There are three ways to ignore HTTP requests from being tracked by the progress bar:

**1. Ignore a specific request**:
Use the `HttpHeaders` to add the `ignoreProgressBar` header to the request, and the progress bar will ignore that request.

```typescript
const headers = new HttpHeaders({ ignoreProgressBar: '' });
this.http.get('/api/tasks', { headers }).subscribe(...);
```

**2. Ignore requests to a specific API**:
You can configure the `NgProgressHttp` provider to ignore all requests to a specific API.

**Example:** Ignore all requests to `https://api.domain.com`

```typescript
import { provideNgProgressHttp, progressInterceptor } from 'ngx-progressbar/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([progressInterceptor])),
    provideNgProgressHttp({
      silentApis: ['https://api.domain.com']
    })
  ]
});
```

**Example:** Ignore all requests that contain `users` in the API path

```typescript
import { provideNgProgressHttp, progressInterceptor } from 'ngx-progressbar/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([progressInterceptor])),
    provideNgProgressHttp({
      silentApis: ['users']
    })
  ]
});
```

**Result:**

> https://prod.domain.com/users: Ignored  
> https://example.com/users: Ignored  
> https://domain.com/reviews: Not ignored


**3. Ignore requests using a regular expression**:
You can use a regular expression to specify which requests should be ignored by the progress bar.

```typescript
import { provideNgProgressHttp, progressInterceptor } from 'ngx-progressbar/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([progressInterceptor])),
    provideNgProgressHttp({
      matcher: `https?:\\/\\/(\\S*\\.)?domain\\.com`
    })
  ]
});
```

**Result:**

> https://api.domain.com/places: Ignored  
> https://prod.domain.com/users: Ignored  
> https://domain.com/reviews/v1/test: Ignored

You can also use the `matcher` option in combination with the `silentApis` option to create more complex rules for ignoring requests.

```typescript
import { provideNgProgressHttp, progressInterceptor } from 'ngx-progressbar/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([progressInterceptor])),
    provideNgProgressHttp({
      silentApis: ['v1', 'users'],
      matcher: `https?:\\/\\/(\\S*\\.)?domain\\.com`
    })
  ]
});
```

**Result:**

> https://api.domain.com/places: Not ignored  
> https://prod.domain.com/users: Ignored  
> https://domain.com/reviews/v1/test: Ignored

### NgProgressHttp API

| Name               | Default     | Description                                                |
| ------------------ | :---------: | ---------------------------------------------------------- |
| **silentApis**     | [ ]         | *Array of silent APIs which will be ignored.*              |
| **matcher**        | undefined   | *More flexible/permissive. subdomain.*                     |

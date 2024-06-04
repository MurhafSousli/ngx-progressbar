import { inject } from '@angular/core';
import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { NG_PROGRESS_HTTP_CONFIG, NgProgressHttpConfig } from './ng-progress-http.model';
import { NgProgressHttpInternal } from './ng-progress-http-internal';

export function progressInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const config: NgProgressHttpConfig = inject(NG_PROGRESS_HTTP_CONFIG);
  const manager: NgProgressHttpInternal = inject(NgProgressHttpInternal);

  // Ignore by request headers
  if (req.headers.has('ignoreProgressBar')) {
    return next(req.clone({ headers: req.headers.delete('ignoreProgressBar') }))
  }

  // Ignore silent api requests
  if (config && checkUrl(req, config)) {
    return next(req);
  }

  manager.inProgressCount.set(manager.inProgressCount() + 1);

  return next(req).pipe(
    finalize(() => {
      manager.inProgressCount.set(manager.inProgressCount() - 1);
    })
  );
}


/**
 * Check if request is silent.
 */
function checkUrl(req: HttpRequest<any>, config: NgProgressHttpConfig): boolean {
  const url: string = req.url.toLowerCase();

  if (config.matcher && config.silentApis?.length) {
    return checkForMatcher(url, config.matcher) && checkForSilentApis(url, config.silentApis);
  }
  if (config.silentApis?.length) {
    return checkForSilentApis(url, config.silentApis);
  }
  if (config.matcher) {
    return checkForMatcher(url, config.matcher);
  }
  return false;
}

function checkForSilentApis(url: string, silentApis: string[]): boolean {
  return !!silentApis.find((u: string) => url.includes(u.toLowerCase()));
}

function checkForMatcher(url: string, matcher: string): boolean {
  return !!url.match(matcher);
}

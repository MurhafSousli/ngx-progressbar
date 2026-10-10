import { inject, untracked, WritableSignal } from '@angular/core';
import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { NgProgressHttpCounter } from './ng-progress-http-counter';
import { NG_PROGRESS_HTTP_OPTIONS, NgProgressHttpOptions } from './ng-progress-http.model';

export function progressInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

  const config: NgProgressHttpOptions = inject(NG_PROGRESS_HTTP_OPTIONS);

  const inProgressCount: WritableSignal<number> = inject(NgProgressHttpCounter);

  // Ignore by request headers
  if (req.headers.has('ignoreProgressBar')) {
    return next(req.clone({ headers: req.headers.delete('ignoreProgressBar') }));
  }

  // Ignore silent api requests
  if (config && checkUrl(req, config)) {
    return next(req);
  }

  return untracked(() => {
    inProgressCount.set(inProgressCount() + 1);

    return next(req).pipe(
      finalize(() => {
        inProgressCount.set(inProgressCount() - 1);
      })
    );
  });
}


/**
 * Check if request is silent.
 */
function checkUrl(req: HttpRequest<unknown>, config: NgProgressHttpOptions): boolean {
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

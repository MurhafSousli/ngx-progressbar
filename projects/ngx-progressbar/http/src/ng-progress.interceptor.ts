import { Injectable, Optional, Inject } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NgProgress, NgProgressRef } from 'ngx-progressbar';
import { NgProgressHttpConfig, ProgressHttpConfig, NG_PROGRESS_HTTP_CONFIG } from './ng-progress-http.interface';

@Injectable()
export class NgProgressInterceptor implements HttpInterceptor {

  private _inProgressCount = 0;
  private _progressRef!: NgProgressRef;
  private readonly _config: ProgressHttpConfig = {
    id: 'root',
    silentApis: [],
    matcher: undefined
  };

  constructor(protected ngProgress: NgProgress, @Optional() @Inject(NG_PROGRESS_HTTP_CONFIG) config?: NgProgressHttpConfig) {
    this._config = config ? { ...this._config, ...config } : this._config;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Ignore by request headers
    if (req.headers.has('ignoreProgressBar')) {
      return next.handle(req.clone({ headers: req.headers.delete('ignoreProgressBar') }));
    }

    // Ignore silent api requests
    if (this.checkUrl(req)) {
      return next.handle(req);
    }

    this._inProgressCount++;

    this._progressRef = this.ngProgress.ref(this._config.id);
    if (!this._progressRef.isStarted) {
      this._progressRef.start();
    }

    return next.handle(req).pipe(
      finalize(() => {
        this._inProgressCount--;
        if (this._inProgressCount === 0) {
          this._progressRef.complete();
        }
      })
    );
  }

  /**
   * Check if request is silent.
   * @param req request
   */
  private checkUrl(req: HttpRequest<any>): boolean {
    const url: string = req.url.toLowerCase();

    if (this._config.matcher && this._config.silentApis?.length) {
      return checkForMatcher(url, this._config.matcher) && checkForSilentApis(url, this._config.silentApis);
    }
    if (this._config.silentApis?.length) {
      return checkForSilentApis(url, this._config.silentApis);
    }
    if (this._config.matcher) {
      return checkForMatcher(url, this._config.matcher);
    }
    return false;
  }
}

function checkForSilentApis(url: string, silentApis: string[]): boolean {
  return !!silentApis.find((u: string) => url.includes(u.toLowerCase()));
}

function checkForMatcher(url: string, matcher: string): boolean {
  return !!url.match(matcher);
}

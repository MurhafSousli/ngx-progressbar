import { Injectable, Optional, Inject } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NgProgress, NgProgressRef } from 'ngx-progressbar';
// import { NgProgress, NgProgressRef } from '../../src/public-api';
import { NgProgressHttpConfig, NG_PROGRESS_HTTP_CONFIG } from './ng-progress-http.interface';

@Injectable()
export class NgProgressInterceptor implements HttpInterceptor {

  private _inProgressCount = 0;
  private _progressRef: NgProgressRef;
  private readonly _config: NgProgressHttpConfig = {
    id: 'root',
    silentApis: []
  };

  constructor(protected ngProgress: NgProgress, @Optional() @Inject(NG_PROGRESS_HTTP_CONFIG) config?: NgProgressHttpConfig) {
    this._config = config ? {...this._config, ...config} : this._config;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Ignore by request headers
    if (req.headers.has('ignoreProgressBar')) {
      return next.handle(req.clone({headers: req.headers.delete('ignoreProgressBar')}));
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
  private checkUrl(req: HttpRequest<any>) {
    const url = req.url.toLowerCase();
    const found = this._config.silentApis.find((u) => url.startsWith(u));
    return !!found;
  }
}

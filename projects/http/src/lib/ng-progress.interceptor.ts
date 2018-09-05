import { Injectable, Optional, Inject } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';
import { NgProgressHttpConfig, CONFIG } from './ng-progress-http.interface';

@Injectable()
export class NgProgressInterceptor implements HttpInterceptor {

  private _inProgressCount = 0;
  private _progressRef: NgProgressRef;
  private _config: NgProgressHttpConfig = {
    id: 'root',
    silentApis: []
  };

  constructor(ngProgress: NgProgress, @Optional() @Inject(CONFIG) config?: NgProgressHttpConfig) {
    this._config = {...this._config, ...config};
    this._progressRef = ngProgress.ref(this._config.id);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Ignore silent api requests
    if (this.checkUrl(req)) {
      return next.handle(req);
    }

    this._inProgressCount++;

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

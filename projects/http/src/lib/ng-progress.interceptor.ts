import { Injectable, Optional, Inject } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NgProgress } from '@ngx-progressbar/core';
import { NgProgressHttpConfig } from './ng-progress-http.interface';
import { CONFIG } from './ng-progress-http.token';

@Injectable()
export class NgProgressInterceptor implements HttpInterceptor {

  private _inProgressCount = 0;

  constructor(private _ngProgress: NgProgress, @Optional() @Inject(CONFIG) private _config?: NgProgressHttpConfig) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Ignore silent api requests
    if (this.checkUrl(req)) {
      return next.handle(req);
    }

    this._inProgressCount++;
    if (!this._ngProgress.ref('root').isStarted) {
      this._ngProgress.start();
    }
    return next.handle(req).pipe(finalize(() => {
      this._inProgressCount--;
      if (this._inProgressCount === 0) {
        this._ngProgress.complete();
      }
    }));
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

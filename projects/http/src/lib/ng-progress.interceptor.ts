import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NgProgress } from '@ngx-progressbar/core';

@Injectable()
export class NgProgressInterceptor implements HttpInterceptor {

  private _inProgressCount = 0;

  constructor(private _ngProgress: NgProgress) {
  }

  // Ignoring specific requests will be supported after this https://github.com/angular/angular/issues/18155
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
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
}

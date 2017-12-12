import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';
import { NgProgress } from '@ngx-progressbar/core';

@Injectable()
export class NgProgressInterceptor implements HttpInterceptor {
  private inProgressCount: number;
  constructor(public progress: NgProgress) {
    this.inProgressCount = 0;
  }

  // Ignoring specific requests will be supported after this https://github.com/angular/angular/issues/18155
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.inProgressCount++;
    if (!this.progress.isStarted) {
      this.progress.start();
    }
    return next.handle(req).pipe(finalize(() => {
      this.inProgressCount--;
      if (0 === this.inProgressCount) {
        this.progress.done();
      }
    }));
  }
}

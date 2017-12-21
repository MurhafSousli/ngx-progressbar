import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';
import { NgProgress } from '@ngx-progressbar/core';

@Injectable()
export class NgProgressInterceptor implements HttpInterceptor {
  
  private inProgressCount = 0;
  
  constructor(public progress: NgProgress) {
  }

  // Ignoring specific requests will be supported after this https://github.com/angular/angular/issues/18155
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.inProgressCount++;
    if (!this.progress.isStarted) {
      this.progress.start();
    }
    return next.handle(req).pipe(finalize(() => {
      this.inProgressCount--;
      if (this.inProgressCount === 0) {
        this.progress.done();
      }
    }));
  }
}

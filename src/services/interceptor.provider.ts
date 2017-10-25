import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { NgProgress } from './progress.service';
import 'rxjs/add/operator/finally';

@Injectable()
export class NgProgressInterceptor implements HttpInterceptor {

  constructor(public ngProgress: NgProgress) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.ngProgress.start();
    return next.handle(req).finally(() => {
      this.ngProgress.done();
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { NgProgress } from './progress.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class NgProgressInterceptor implements HttpInterceptor {

  constructor(public progress: NgProgress) {
  }

  // Ignoring specific requests will be supported after this https://github.com/angular/angular/issues/18155
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.progress.start();
    return next.handle(req).pipe(finalize(() => this.progress.done()));
  }
}

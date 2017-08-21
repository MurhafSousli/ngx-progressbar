import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { NgProgressService } from './progress.service';
import 'rxjs/add/operator/finally';

@Injectable()
export class NgProgressInterceptor implements HttpInterceptor {

  constructor(public progressService: NgProgressService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.progressService.start();
    return next.handle(req).finally(() => {
      this.progressService.done();
    });
  }
}

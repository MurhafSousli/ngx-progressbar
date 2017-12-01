import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { NgProgress } from '@ngx-progressbar/core';
export declare class NgProgressInterceptor implements HttpInterceptor {
    progress: NgProgress;
    constructor(progress: NgProgress);
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
}

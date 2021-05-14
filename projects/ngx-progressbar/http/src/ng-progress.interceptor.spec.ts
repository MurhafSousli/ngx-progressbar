// import { inject, TestBed } from '@angular/core/testing';
// import { HTTP_INTERCEPTORS, HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { NgProgressInterceptor } from './ng-progress.interceptor';
// import { NgProgressModule } from '../../src/lib/ng-progress.module';
// import { NgProgressHttpModule } from './ng-progress-http.module';
// import { NgProgress } from '../../src/lib/ng-progress.service';
//
// @Injectable()
// export class TestService {
//   constructor(private http: HttpClient) {
//   }
//
//   testRequest(): Observable<any> {
//     const headers = new HttpHeaders({ ignoreProgressBar: '' });
//     return this.http.get('https://reqres.in/api/users?delay=1', { headers });
//   }
// }
//
// describe(`AuthHttpInterceptor`, () => {
//   let httpMock: HttpTestingController;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         NgProgressModule,
//         NgProgressHttpModule,
//         HttpClientTestingModule
//       ],
//       providers: [
//         TestService,
//         {
//           provide: HTTP_INTERCEPTORS,
//           useClass: NgProgressInterceptor,
//           multi: true,
//         },
//       ],
//     });
//
//     httpMock = TestBed.get(HttpTestingController);
//   });
//
//   it('should start the progress bar with http request',
//     inject(
//       [HttpClient, HttpTestingController, NgProgress],
//       (http: HttpClient, httpMock: HttpTestingController, ngProgress: NgProgress) => {
//         const progressRef = ngProgress.ref();
//         spyOn(progressRef, 'start');
//
//         // const headers = new HttpHeaders({ ignoreProgressBar: '' });
//         http.get('https://reqres.in/api/users?delay=1').subscribe();
//
//         expect(progressRef.start).toHaveBeenCalled();
//         httpMock.verify();
//       })
//   );

  // it('adds Authorization header',
  //   inject(
  //     [HttpClient, HttpTestingController, NgProgress],
  //     (http: HttpClient, httpMock: HttpTestingController, ngProgress: NgProgress) => {
  //
  //       const headers = new HttpHeaders({ ignoreProgressBar: '' });
  //       http.get('https://reqres.in/api/users?delay=1', { headers }).subscribe();
  //
  //       const req = httpMock.expectOne(r =>
  //         r.headers.has('Authorization') &&
  //         r.headers.get('Authorization') === `${mockAuthService.tokenType} ${mockAuthService.tokenValue}`);
  //       expect(req.request.method).toEqual('GET');
  //
  //       req.flush({ hello: 'world' });
  //       httpMock.verify();
  //     }));

  // afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
  //   httpMock.verify();
  // }));
// });

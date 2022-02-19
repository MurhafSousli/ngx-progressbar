import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { NgProgressModule, NgProgress, NgProgressRef } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';

const CUSTOM_PROGRESS_ID: string = 'my-custom-progress';

describe(`NgProgressHttp`, () => {
  let ngProgress: NgProgress;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgProgressModule,
        NgProgressHttpModule,
        HttpClientTestingModule
      ]
    });

    ngProgress = TestBed.inject(NgProgress);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should start the progress bar with http request', (done: DoneFn) => {

    const progressRef: NgProgressRef = ngProgress.ref();
    spyOn(progressRef, 'start');
    spyOn(progressRef, 'complete');

    httpClient.get('/users').subscribe(() => {
      // Check that progress.complete() has been called after the request is completed
      // Need to check that async
      setTimeout(() => {
        expect(progressRef.complete).toHaveBeenCalled();
        done();
      });
    });

    // Check that progress.start() has been called
    expect(progressRef.start).toHaveBeenCalled();

    const req = httpTestingController.expectOne('/users');
    expect(req.request.method).toEqual('GET');

    // Complete the request after a tiny delay
    setTimeout(() => {
      req.flush({});
    }, 200);
  });

  it('should NOT start the progress bar when ignoreProgressBar is set in request header', () => {
    const progressRef: NgProgressRef = ngProgress.ref();
    spyOn(progressRef, 'start');

    const headers = new HttpHeaders({ ignoreProgressBar: '' });
    httpClient.get('/users', { headers }).subscribe();
    expect(progressRef.start).not.toHaveBeenCalled();

    const req = httpTestingController.expectOne('/users');

    req.flush({});
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});

describe(`NgProgressHttp with custom id and silentApis`, () => {
  let ngProgress: NgProgress;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  const url1: string = 'https://domain.com/silent/123';
  const url2: string = 'https://domain.com/another-path/xxx';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgProgressModule,
        NgProgressHttpModule,
        NgProgressHttpModule.withConfig({
          id: CUSTOM_PROGRESS_ID,
          silentApis: ['/silent', '/another-path']
        }),
        HttpClientTestingModule
      ]
    });

    ngProgress = TestBed.inject(NgProgress);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should NOT start the progress bar if the requests are defined in silentApis', () => {
    const progressRef: NgProgressRef = ngProgress.ref(CUSTOM_PROGRESS_ID);
    spyOn(progressRef, 'start');

    httpClient.get(url1).subscribe();
    httpClient.get(url2).subscribe();
    expect(progressRef.start).not.toHaveBeenCalled();

    const req1 = httpTestingController.expectOne(url1);
    const req2 = httpTestingController.expectOne(url2);

    req1.flush({});
    req2.flush({});
  });
});

describe(`NgProgressHttp with matcher`, () => {
  let ngProgress: NgProgress;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  const url1: string = 'https://www.api.domain.com/places';
  const url2: string = 'https://preprod.domain.com/user';
  const url3: string = 'https://domain.com/reviews/v1/test';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgProgressModule,
        NgProgressHttpModule,
        NgProgressHttpModule.withConfig({
          matcher: `https?:\\/\\/(\\S*\\.)?domain\\.com`
        }),
        HttpClientTestingModule
      ]
    });

    ngProgress = TestBed.inject(NgProgress);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should NOT start the progress bar if the requests are defined in matcher', () => {
    const progressRef: NgProgressRef = ngProgress.ref();
    spyOn(progressRef, 'start');

    httpClient.get(url1).subscribe();
    httpClient.get(url2).subscribe();
    httpClient.get(url3).subscribe();
    expect(progressRef.start).not.toHaveBeenCalled();

    const req1 = httpTestingController.expectOne(url1);
    const req2 = httpTestingController.expectOne(url2);
    const req3 = httpTestingController.expectOne(url3);

    req1.flush({});
    req2.flush({});
    req3.flush({});
  });
});

describe(`NgProgressHttp with matcher + silentApis`, () => {
  let ngProgress: NgProgress;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  const url1: string = 'https://www.api.domain.com/places';
  const url2: string = 'https://preprod.domain.com/user';
  const url3: string = 'https://domain.com/reviews/v1/test';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgProgressModule,
        NgProgressHttpModule,
        NgProgressHttpModule.withConfig({
          silentApis: ['/user', '/reviews'],
          matcher: `https?:\\/\\/(\\S*\\.)?domain\\.com`
        }),
        HttpClientTestingModule
      ]
    });

    ngProgress = TestBed.inject(NgProgress);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should NOT start the progress bar if the requests are defined in matcher', () => {
    const progressRef: NgProgressRef = ngProgress.ref();
    spyOn(progressRef, 'start');

    httpClient.get(url1).subscribe();
    httpClient.get(url2).subscribe();
    httpClient.get(url3).subscribe();
    expect(progressRef.start).toHaveBeenCalledTimes(1);

    const req1 = httpTestingController.expectOne(url1);
    const req2 = httpTestingController.expectOne(url2);
    const req3 = httpTestingController.expectOne(url3);

    req1.flush({});
    req2.flush({});
    req3.flush({});
  });
});

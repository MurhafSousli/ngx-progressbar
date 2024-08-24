import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting, TestRequest } from '@angular/common/http/testing';
import { HttpClient, HttpHeaders, provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgProgressbar, NgProgressRef } from 'ngx-progressbar';
import { NG_PROGRESS_HTTP_OPTIONS, NgProgressHttp, progressInterceptor } from 'ngx-progressbar/http';

@Component({
  standalone: true,
  template: `
    <ng-progress ngProgressHttp/>
  `,
  imports: [NgProgressbar, NgProgressHttp]
})
class TestComponent {
}

describe(`NgProgressHttp`, () => {
  let fixture: ComponentFixture<TestComponent>;
  let progressRef: NgProgressRef;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent, NgProgressHttp],
      providers: [
        provideHttpClient(
          withInterceptors([progressInterceptor]),
        ),
        provideHttpClientTesting()
      ]
    });
  });

  it('should start the progress bar with http request', (done: DoneFn) => {
    fixture = TestBed.createComponent(TestComponent);
    progressRef = fixture.debugElement.query(By.directive(NgProgressRef)).injector.get(NgProgressRef);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

    const startSpy: jasmine.Spy = spyOn(progressRef, 'start').and.callThrough();
    const completeSpy: jasmine.Spy = spyOn(progressRef, 'complete');

    httpClient.get('/users').subscribe(() => {
      setTimeout(() => {
        // Check that progress.complete() has been called after the request is completed
        expect(completeSpy).toHaveBeenCalled();
        done();
      });
    });

    // Need to detect changes
    fixture.detectChanges();

    // Check that progress.start() has been called
    expect(startSpy).toHaveBeenCalled();

    const req: TestRequest = httpTestingController.expectOne('/users');
    expect(req.request.method).toEqual('GET');

    // Complete the request after 200ms delay
    setTimeout(() => {
      req.flush({});
    }, 200);
  });

  it('should NOT start the progress bar when ignoreProgressBar is set in request header', () => {
    fixture = TestBed.createComponent(TestComponent);
    progressRef = fixture.debugElement.query(By.directive(NgProgressRef)).injector.get(NgProgressRef);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

    const startSpy: jasmine.Spy = spyOn(progressRef, 'start');

    const headers: HttpHeaders = new HttpHeaders({ ignoreProgressBar: '' });
    httpClient.get('/users', { headers }).subscribe();

    fixture.detectChanges();

    expect(startSpy).not.toHaveBeenCalled();

    const req: TestRequest = httpTestingController.expectOne('/users');

    req.flush({});
  });

  it('should NOT start the progress bar if the requests are defined in silentApis', () => {
    TestBed.overrideProvider(NG_PROGRESS_HTTP_OPTIONS, {
      useValue: {
        silentApis: ['/silent', '/another-path']
      }
    });

    fixture = TestBed.createComponent(TestComponent);
    progressRef = fixture.debugElement.query(By.directive(NgProgressRef)).injector.get(NgProgressRef);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

    const url1: string = 'https://domain.com/silent/123';
    const url2: string = 'https://domain.com/another-path/xxx';

    const startSpy: jasmine.Spy = spyOn(progressRef, 'start');

    httpClient.get(url1).subscribe();
    fixture.detectChanges();
    httpClient.get(url2).subscribe();
    fixture.detectChanges();

    expect(startSpy).not.toHaveBeenCalled();

    const req1: TestRequest = httpTestingController.expectOne(url1);
    const req2: TestRequest = httpTestingController.expectOne(url2);

    req1.flush({});
    req2.flush({});
  });

  it('should NOT start the progress bar if the requests are defined in matcher', () => {
    TestBed.overrideProvider(NG_PROGRESS_HTTP_OPTIONS, {
      useValue: {
        matcher: `https?:\\/\\/(\\S*\\.)?domain\\.com`
      }
    });
    fixture = TestBed.createComponent(TestComponent);
    progressRef = fixture.debugElement.query(By.directive(NgProgressRef)).injector.get(NgProgressRef);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

    const url1: string = 'https://www.api.domain.com/places';
    const url2: string = 'https://preprod.domain.com/user';
    const url3: string = 'https://domain.com/reviews/v1/test';

    const startSpy: jasmine.Spy = spyOn(progressRef, 'start');

    httpClient.get(url1).subscribe();
    fixture.detectChanges();
    httpClient.get(url2).subscribe();
    fixture.detectChanges();
    httpClient.get(url3).subscribe();
    fixture.detectChanges();

    expect(startSpy).not.toHaveBeenCalled();

    const req1: TestRequest = httpTestingController.expectOne(url1);
    const req2: TestRequest = httpTestingController.expectOne(url2);
    const req3: TestRequest = httpTestingController.expectOne(url3);

    req1.flush({});
    req2.flush({});
    req3.flush({});
  });

  it('should NOT start the progress bar if the requests are defined in silentApis or matcher', () => {
    TestBed.overrideProvider(NG_PROGRESS_HTTP_OPTIONS, {
      useValue: {
        silentApis: ['/user', '/reviews'],
        matcher: `https?:\\/\\/(\\S*\\.)?domain\\.com`
      }
    });
    fixture = TestBed.createComponent(TestComponent);
    progressRef = fixture.debugElement.query(By.directive(NgProgressRef)).injector.get(NgProgressRef);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

    const url1: string = 'https://www.api.domain.com/places';
    const url2: string = 'https://preprod.domain.com/user';
    const url3: string = 'https://domain.com/reviews/v1/test';

    const startSpy: jasmine.Spy = spyOn(progressRef, 'start');

    httpClient.get(url1).subscribe();
    fixture.detectChanges();
    httpClient.get(url2).subscribe();
    fixture.detectChanges();
    httpClient.get(url3).subscribe();
    fixture.detectChanges();

    expect(startSpy).toHaveBeenCalledTimes(1);

    const req1: TestRequest = httpTestingController.expectOne(url1);
    const req2: TestRequest = httpTestingController.expectOne(url2);
    const req3: TestRequest = httpTestingController.expectOne(url3);

    req1.flush({});
    req2.flush({});
    req3.flush({});
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});

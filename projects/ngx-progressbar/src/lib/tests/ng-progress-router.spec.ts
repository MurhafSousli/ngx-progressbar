import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { provideRouter, Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgProgressRef, NgProgressbar } from 'ngx-progressbar';
import { NgProgressRouter, provideNgProgressRouter } from 'ngx-progressbar/router';

const CUSTOM_PROGRESS_DELAY: number = 200;

@Component({
  template: `
    <ng-progress ngProgressRouter/>
  `,
  imports: [NgProgressbar, NgProgressRouter]
})
class TestComponent {
}

@Component({
  selector: 'page-1',
  template: ''
})
export class Page1 {
}

@Component({
  selector: 'page-2',
  template: ''
})
export class Page2 {
}

describe(`NgProgressRouter`, () => {
  let fixture: ComponentFixture<TestComponent>;
  let progressRef: NgProgressRef;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          { path: '', component: Page1 },
          { path: 'page2', component: Page2 }
        ]),
        provideNgProgressRouter({
          minDuration: CUSTOM_PROGRESS_DELAY
        })
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(TestComponent);
    progressRef = fixture.debugElement.query(By.directive(NgProgressRef)).injector.get(NgProgressRef);
  });

  it('should start/complete the progress bar on route change', (done: DoneFn) => {
    const startSpy: jasmine.Spy = spyOn(progressRef, 'start');
    const completeSpy: jasmine.Spy = spyOn(progressRef, 'complete');

    fixture.detectChanges();

    router.navigate(['page2']).then(() => {
      fixture.detectChanges();
      setTimeout(() => {
        expect(completeSpy).toHaveBeenCalled();
        done();
      }, CUSTOM_PROGRESS_DELAY);
    });

    // Need a tiny delay to catch the start call
    setTimeout(() => {
      expect(startSpy).toHaveBeenCalled();
    });
  });
});

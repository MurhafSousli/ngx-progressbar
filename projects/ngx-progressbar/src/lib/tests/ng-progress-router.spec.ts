import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { provideRouter, Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgProgressRef, NgProgressbar } from 'ngx-progressbar';
import { NgProgressRouter, provideNgProgressRouter } from 'ngx-progressbar/router';

const CUSTOM_PROGRESS_DELAY: number = 200;

@Component({
  standalone: true,
  template: `
    <ng-progress ngProgressRouter/>
  `,
  imports: [NgProgressbar, NgProgressRouter]
})
class TestComponent {
}

@Component({
  standalone: true,
  selector: 'page-1',
  template: ''
})
export class Page1 {
}

@Component({
  standalone: true,
  selector: 'page-2',
  template: ''
})
export class Page2 {
}

describe(`NgProgressRouter`, () => {
  let fixture: ComponentFixture<TestComponent>;
  let progressRef: NgProgressRef;
  let progressRouter: NgProgressRouter;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TestComponent,
        Page1,
        Page2
      ],
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
    progressRouter = fixture.debugElement.query(By.directive(NgProgressRouter)).injector.get(NgProgressRouter);
  });

  it('should start/complete the progress bar on route change', (done: DoneFn) => {
    const startSpy: jasmine.Spy = spyOn(progressRef, 'start');
    const completeSpy: jasmine.Spy = spyOn(progressRef, 'complete');

    progressRouter.ngOnInit();

    router.navigate(['page2']).then(() => {
      fixture.detectChanges();
      setTimeout(() => {
        expect(completeSpy).toHaveBeenCalled();
        done();
      }, CUSTOM_PROGRESS_DELAY);
    });

    expect(startSpy).toHaveBeenCalled();
  });
});

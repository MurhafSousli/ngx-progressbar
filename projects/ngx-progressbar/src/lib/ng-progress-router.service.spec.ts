import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { NgProgressModule, NgProgress, NgProgressRef } from 'ngx-progressbar';
import { NgProgressRouterModule } from 'ngx-progressbar/router';

const CUSTOM_PROGRESS_ID: string = 'my-custom-progress';
const CUSTOM_PROGRESS_DELAY: number = 200;

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
  let ngProgress: NgProgress;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NgProgressModule,
        NgProgressRouterModule.withConfig({
          id: CUSTOM_PROGRESS_ID,
          delay: CUSTOM_PROGRESS_DELAY
        }),
        RouterTestingModule.withRoutes([
          { path: '', component: Page1 },
          { path: 'page2', component: Page2 }
        ])
      ],
      declarations: [Page1, Page2]
    }).compileComponents();

    ngProgress = TestBed.inject(NgProgress);
    router = TestBed.inject(Router);
  });

  it('should start/complete the progress bar on route change', (done: DoneFn) => {
    const progressRef: NgProgressRef = ngProgress.ref(CUSTOM_PROGRESS_ID);
    spyOn(progressRef, 'start');
    spyOn(progressRef, 'complete');

    router.navigate(['page2']).then(() => {
      setTimeout(() => {
        expect(progressRef.complete).toHaveBeenCalled();
        done();
      }, CUSTOM_PROGRESS_DELAY);
    });

    expect(progressRef.start).toHaveBeenCalled();
  });
});

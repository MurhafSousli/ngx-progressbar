import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgProgress, NgProgressComponent, NgProgressModule } from 'ngx-progressbar';

describe('NgProgress Component', () => {
  let component: NgProgressComponent;
  let ngProgress: NgProgress;
  let fixture: ComponentFixture<NgProgressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgProgressModule]
    });

    ngProgress = TestBed.inject(NgProgress);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgProgressComponent);
    component = fixture.componentInstance;
  });

  it('should create a progress bar', () => {
    expect(component).toBeDefined();
  });

  it('should start/complete the progress using the start/complete functions', (done: DoneFn) => {
    const progressRef = ngProgress.ref();
    spyOn(progressRef, 'start');
    spyOn(progressRef, 'complete');
    component.ngOnInit();

    component.start();
    expect(progressRef.start).toHaveBeenCalled();

    setTimeout(() => {
      component.complete();
      expect(progressRef.complete).toHaveBeenCalled();
      done();
    }, 200);
  });

  it('should get true on isStarted when progress is started', (done: DoneFn) => {
    component.ngOnInit();
    component.start();

    setTimeout(() => {
      expect(component.isStarted).toBeTrue();
      done();
    });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgProgressbar, NgProgressRef } from 'ngx-progressbar';

describe('NgProgress Component', () => {
  let fixture: ComponentFixture<NgProgressbar>;
  let component: NgProgressbar;
  let progressRef: NgProgressRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgProgressbar]
    });

    fixture = TestBed.createComponent(NgProgressbar);
    component = fixture.componentInstance;
    progressRef = component.progressRef;
  });

  it('should create a progress bar', () => {
    expect(component).toBeDefined();
  });

  it('should start/complete the progress using the start/complete functions', (done: DoneFn) => {
    const startSpy: jasmine.Spy = spyOn(progressRef, 'start');
    const completeSpy: jasmine.Spy = spyOn(progressRef, 'complete');

    component.start();
    expect(startSpy).toHaveBeenCalled();

    setTimeout(() => {
      component.complete();
      expect(completeSpy).toHaveBeenCalled();
      done();
    }, 200);
  });

  it('should active signal when progress is started', (done: DoneFn) => {
    component.start();

    setTimeout(() => {
      expect(progressRef.active()).toBeTrue();
      done();
    }, 50);
  });

  it('should increment the progress using inc function', () => {
    const incSpy: jasmine.Spy = spyOn(progressRef, 'inc');

    component.inc(20);
    expect(incSpy).toHaveBeenCalledWith(20);
  });

  it('should increment the progress using set function', () => {
    const setSpy: jasmine.Spy = spyOn(progressRef, 'set');

    component.set(50);
    expect(setSpy).toHaveBeenCalledWith(50);
  });
});

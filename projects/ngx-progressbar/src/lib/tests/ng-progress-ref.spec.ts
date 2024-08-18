import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgProgressOptions, NgProgressRef } from 'ngx-progressbar';
import { defaultOptions } from '../ng-progress-default';

export async function afterTimeout(timeout: number): Promise<void> {
  // Use await with a setTimeout promise
  await new Promise<void>((resolve) => setTimeout(resolve, timeout));
}

describe('NgProgressRef', () => {
  let directive: NgProgressRef;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent]
    });

    fixture = TestBed.createComponent(TestComponent);
    directive = fixture.debugElement.query(By.directive(NgProgressRef)).injector.get(NgProgressRef);
  });

  it('should initialize with the default config', () => {
    expect(directive.config()).toEqual(defaultOptions);
  });

  it('should start and complete the progress', async () => {
    directive.start();

    fixture.detectChanges();
    expect(directive.active()).toBeTrue();
    expect(directive.progress()).toBe(0);

    await afterTimeout(350);
    fixture.detectChanges();
    expect(directive.progress()).toBeGreaterThan(10);

    directive.complete();
    fixture.detectChanges();

    await afterTimeout(20);
    expect(directive.progress()).toBe(100);
    await afterTimeout(350);
    expect(directive.active()).toBeFalse();
  });

  it('should start and complete the progress', (done: DoneFn) => {
    const setSpy: jasmine.Spy = spyOn(directive, 'set');
    // Assume active state is off
    directive['_active'].set(false);
    // Mock onTrickling call
    directive['onTrickling']({ min: 5 }).subscribe(() => {
      expect(setSpy).toHaveBeenCalledWith(5 as any);
      done();
    });
  });


  it('should increment the progress when inc function is called', async () => {
    directive.inc();

    fixture.detectChanges();
    await afterTimeout(20);
    expect(directive.active()).toBeTrue();
    expect(directive.progress()).toBeGreaterThan(0);
  });

  it('should emit the started and completed events', async () => {
    let startedEmitted: boolean = false;
    let completedEmitted: boolean = false;

    directive.started.subscribe(() => {
      startedEmitted = true;
    });

    directive.completed.subscribe(() => {
      completedEmitted = true;
    });

    directive.start();
    expect(startedEmitted).toBeTrue();

    directive.complete();
    fixture.detectChanges();

    await afterTimeout(20);
    expect(completedEmitted).toBeTrue();
  });

  it('should update the config', () => {
    const newConfig: NgProgressOptions = { ...defaultOptions, min: 20, max: 80 };
    directive.setConfig(newConfig);
    expect(directive.config()).toEqual(newConfig);
  });
});

@Component({
  standalone: true,
  imports: [NgProgressRef],
  template: `
    <div ngProgressRef></div>
  `
})
class TestComponent {
}

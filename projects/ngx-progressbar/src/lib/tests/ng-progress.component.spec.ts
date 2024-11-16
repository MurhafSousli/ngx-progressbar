import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgProgressbar, NgProgressRef } from 'ngx-progressbar';

describe('NgProgress Component', () => {
  let fixture: ComponentFixture<NgProgressbar>;
  let component: NgProgressbar;
  let progressRef: NgProgressRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgProgressbar]
    });

    fixture = TestBed.createComponent(NgProgressbar);
    component = fixture.componentInstance;
    progressRef = component.progressRef;
  });

  it('should create a progress bar', () => {
    expect(component).toBeDefined();
    expect(progressRef).toBeDefined();
  });
});

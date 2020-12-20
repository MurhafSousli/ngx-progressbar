import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { NgProgressComponent } from './ng-progress.component';
import { NgProgress } from './ng-progress.service';

class NgProgressStub {
  config = {};

  ref() {
    return {
      state: of(
        {
          active: true,
          value: 5
        }
      )
    };
  }
}

describe('NgProgressComponent', () => {
  let component: NgProgressComponent;
  let fixture: ComponentFixture<NgProgressComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NgProgressComponent],
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: NgProgress, useClass: NgProgressStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgProgressComponent);
    component = fixture.componentInstance;
  });

  it('should create a progress bar', () => {
    expect(component).toBeDefined();
  });

  // it('should destroy component without errors', () => {
  //   const ngOnDestroySpy = spyOn(component, 'ngOnDestroy');
  //   fixture.destroy();
  //   component.ngOnDestroy();
  //   expect(ngOnDestroySpy).toHaveBeenCalled();
  // });
});

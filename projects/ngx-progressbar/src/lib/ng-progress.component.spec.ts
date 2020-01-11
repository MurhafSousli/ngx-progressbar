import { async, ComponentFixture, TestBed} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { NgProgressComponent } from './ng-progress.component';
import { NgProgress } from './ng-progress.service';

class NgProgressStub {
  config = {
  };

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgProgressComponent],
      imports: [
        RouterTestingModule
      ],
      providers: [
        {provide: NgProgress, useClass: NgProgressStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgProgressComponent);
    component = fixture.componentInstance;
  });

  describe('when ngOnInit has not been called', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });

    it('should destroy component without errors', () => {
      const ngOnDestroySpy = spyOn(component, 'ngOnDestroy').and.callThrough();
      fixture.destroy();
      expect(ngOnDestroySpy).toHaveBeenCalled();
    });
  });

  describe('when ngOnInit has been called', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should destroy component without errors', () => {
      const ngOnDestroySpy = spyOn(component, 'ngOnDestroy').and.callThrough();
      fixture.destroy();
      expect(ngOnDestroySpy).toHaveBeenCalled();
    });
  });
});

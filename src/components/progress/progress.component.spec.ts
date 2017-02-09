// import {async, ComponentFixture, TestBed} from '@angular/core/testing';
// import {By}              from '@angular/platform-browser';
// import {DebugElement}    from '@angular/core';
//
// import {ProgressComponent} from './progress.component';
// import {ProgressBarComponent} from '../progress-bar/progress-bar.component';
//
// describe('ProgressComponent', () => {
//
//     let comp: ProgressComponent;
//     let fixture: ComponentFixture<ProgressComponent>;
//
//     // async beforeEach
//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             declarations: [ProgressComponent, ProgressBarComponent], // declare the test component
//         }).compileComponents();  // compile template and css
//     }));
//
//     // synchronous beforeEach
//     beforeEach(() => {
//         fixture = TestBed.createComponent(ProgressComponent);
//         comp = fixture.componentInstance;
//     });
//
//     it('should render progressbar', () => {
//
//         comp.ease = 'linear';
//         comp.positionUsing = 'linear';
//         comp.showSpinner = false;
//         comp.direction = 'leftToRightIncreased';
//         comp.color = '#29d';
//         comp.thick = false;
//         comp.minimum = 0.08;
//         comp.trickleSpeed = 300;
//         comp.toggle = false;
//
//         fixture.detectChanges();
//
//         const progress = fixture.debugElement.query(By.css('.progress'));
//         expect(progress).toBeTruthy();
//         expect(sbButtons.children.length).toEqual(8); // currently 8 share buttons
//     });
//
//
//
// });

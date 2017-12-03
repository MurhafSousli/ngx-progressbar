import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgProgressBarComponent } from './components/ng-progress-bar/ng-progress-bar.component';
import { NgProgressComponent } from './components/ng-progress/ng-progress.component';
import { NgProgress } from './services/ng-progress.service';

@NgModule({
  declarations: [
    NgProgressComponent,
    NgProgressBarComponent
  ],
  exports: [NgProgressComponent],
  imports: [CommonModule]
})
export class NgProgressModule {
  static forRoot() {
    return {
      ngModule: NgProgressModule,
      providers: [NgProgress]
    };
  }
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProgressBarComponent} from "./progress-bar/progress-bar.component";
import {ProgressComponent} from "./progress/progress.component";
import {ProgressService} from './progress.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ProgressComponent,
    ProgressBarComponent
  ],
  providers: [
    ProgressService
  ],
  exports: [
    ProgressComponent
  ]
})
export class NgProgressModule {
}

export {
  ProgressService,
  ProgressComponent
}

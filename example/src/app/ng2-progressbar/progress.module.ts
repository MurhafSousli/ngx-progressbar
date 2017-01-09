import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProgressBarComponent} from "./components/progress-bar/progress-bar.component";
import {ProgressComponent} from "./components/progress/progress.component";
import {NgProgressService} from './service/progress.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ProgressComponent,
    ProgressBarComponent
  ],
  providers: [
    NgProgressService
  ],
  exports: [
    ProgressComponent
  ]
})
export class NgProgressModule {
}

export {
  NgProgressService,
  ProgressComponent
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarComponent } from '../components/progress-bar.component';
import { ProgressComponent } from '../components/progress.component';
import { NgProgressService } from '../services/progress.service';

@NgModule({
  declarations: [
    ProgressComponent,
    ProgressBarComponent
  ],
  exports: [
    ProgressComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    NgProgressService
  ]
})
export class NgProgressModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarComponent } from '../components/progress-bar.component';
import { ProgressComponent } from '../components/progress.component';
import { NgProgressService } from '../services/progress.service';
import { NgProgressBrowserXhr } from '../services/browser-xhr.provider';

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
    NgProgressService,
    NgProgressBrowserXhr
  ]
})
export class NgProgressModule { }

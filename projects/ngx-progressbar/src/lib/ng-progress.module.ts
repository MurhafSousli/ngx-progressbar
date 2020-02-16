import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgProgressComponent } from './ng-progress.component';
import { NgProgressConfig, NG_PROGRESS_CONFIG } from './ng-progress.interface';

@NgModule({
  declarations: [NgProgressComponent],
  exports: [NgProgressComponent],
  imports: [CommonModule]
})
export class NgProgressModule {
  static withConfig(config: NgProgressConfig): ModuleWithProviders<NgProgressModule> {
    return {
      ngModule: NgProgressModule,
      providers: [
        {provide: NG_PROGRESS_CONFIG, useValue: config}
      ]
    };
  }
}

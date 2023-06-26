import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgProgressComponent } from './ng-progress.component';
import { NgProgressConfig, NG_PROGRESS_CONFIG } from './ng-progress.interface';

@NgModule({
  exports: [NgProgressComponent],
  imports: [NgProgressComponent]
})
export class NgProgressModule {
  static withConfig(config: NgProgressConfig): ModuleWithProviders<NgProgressModule> {
    return {
      ngModule: NgProgressModule,
      providers: [
        { provide: NG_PROGRESS_CONFIG, useValue: config }
      ]
    };
  }
}

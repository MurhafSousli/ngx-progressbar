import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgProgressComponent } from './ng-progress.component';
import { NgProgressConfig, CONFIG } from './ng-progress.interface';

@NgModule({
  declarations: [NgProgressComponent],
  exports: [NgProgressComponent],
  imports: [CommonModule]
})
export class NgProgressModule {
  static forRoot(config?: NgProgressConfig): ModuleWithProviders {
    return {
      ngModule: NgProgressModule,
      providers: [
        {provide: CONFIG, useValue: config}
      ]
    };
  }
}

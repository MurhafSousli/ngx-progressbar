import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgProgressComponent } from './ng-progress.component';
import { NgProgress } from './ng-progress.service';
import { NgProgressConfig } from './ng-progress.interface';
import { CONFIG } from './ng-progress.token';

export function NgProgressFactory(config: NgProgressConfig) {
  return new NgProgress(config);
}

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
        {provide: CONFIG, useValue: config},
        {
          provide: NgProgress,
          useFactory: NgProgressFactory,
          deps: [CONFIG]
        }
      ]
    };
  }
}

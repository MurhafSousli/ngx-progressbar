import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomComponent } from './custom/custom.component';
import { RouterModule } from '@angular/router';
import { NgProgressModule } from '@ngx-progressbar/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: CustomComponent}
    ]),
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatCardModule,
    NgProgressModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [CustomComponent]
})

export class CustomModule {
}

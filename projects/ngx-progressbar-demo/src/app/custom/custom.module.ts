import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { NgProgressModule } from 'ngx-progressbar';
import { CustomComponent } from './custom/custom.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: CustomComponent }
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

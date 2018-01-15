import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { NgProgressModule } from '@ngx-progressbar/core';
import { FormsModule } from '@angular/forms';
import { LabComponent } from './lab/lab.component';
import { MatButtonModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {path: '', component: HomeComponent}
    ]),
    NgProgressModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [
    HomeComponent,
    LabComponent
  ]
})
export class HomeModule {
}

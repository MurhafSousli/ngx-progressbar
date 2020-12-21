import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgProgressModule } from 'ngx-progressbar';
// import { NgProgressModule } from '../../../../ngx-progressbar/src/public-api';
import { HomeComponent } from './home/home.component';
import { LabComponent } from './lab/lab.component';

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

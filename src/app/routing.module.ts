import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '', loadChildren: './home/home.module#HomeModule'
  },
  {
    path: 'custom', loadChildren: './custom/custom.module#CustomModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}

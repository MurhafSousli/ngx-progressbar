import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'custom',
    loadComponent: () => import('./custom/custom.component').then(m => m.CustomComponent)
  }
];

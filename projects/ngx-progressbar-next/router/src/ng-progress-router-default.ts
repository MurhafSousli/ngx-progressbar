import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart } from '@angular/router';
import { NgProgressRouterOptions } from './ng-progress-router.model';

export const defaultRouterOptions: NgProgressRouterOptions = {
  minDuration: 0,
  startEvents: [NavigationStart],
  completeEvents: [NavigationEnd, NavigationCancel, NavigationError]
};

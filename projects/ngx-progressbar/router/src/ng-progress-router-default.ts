import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart } from '@angular/router';
import { NgProgressRouterConfig } from 'ngx-progressbar/router';

export const defaultConfig: NgProgressRouterConfig = {
  delay: 0,
  startEvents: [NavigationStart],
  completeEvents: [NavigationEnd, NavigationCancel, NavigationError]
};

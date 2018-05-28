import { InjectionToken } from '@angular/core';
import { NgProgressHttpConfig } from './ng-progress-http.interface';

export const CONFIG = new InjectionToken<NgProgressHttpConfig>('config');

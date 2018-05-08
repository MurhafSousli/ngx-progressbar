import { InjectionToken } from '@angular/core';
import { NgProgressConfig } from './ng-progress.interface';

export const CONFIG = new InjectionToken<NgProgressConfig>('config');

import { InjectionToken } from '@angular/core';

export interface NgProgressHttpConfig {
  id?: string;
  silentApis?: string[];
}

export const CONFIG = new InjectionToken<NgProgressHttpConfig>('config');

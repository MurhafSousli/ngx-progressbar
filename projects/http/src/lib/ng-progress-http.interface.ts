import { InjectionToken } from '@angular/core';

export interface NgProgressHttpConfig {
  id?: string;
  silentApis?: string[];
}

export const NG_PROGRESS_HTTP_CONFIG = new InjectionToken<NgProgressHttpConfig>('ngProgressHttpConfig');

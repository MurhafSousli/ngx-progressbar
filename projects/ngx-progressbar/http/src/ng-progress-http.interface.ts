import { InjectionToken } from '@angular/core';

export interface ProgressHttpConfig {
  id: string;
  silentApis: string[];
}

export type NgProgressHttpConfig = Partial<ProgressHttpConfig>;

export const NG_PROGRESS_HTTP_CONFIG = new InjectionToken<NgProgressHttpConfig>('ngProgressHttpConfig');

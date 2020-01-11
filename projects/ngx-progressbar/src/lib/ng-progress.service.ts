import { Injectable, Inject, Optional } from '@angular/core';
import { NgProgressRef } from './ng-progress-ref';
import { NgProgressConfig, NG_PROGRESS_CONFIG } from './ng-progress.interface';

const defaultConfig: NgProgressConfig = {
  min: 8,
  max: 100,
  speed: 200,
  debounceTime: 0,
  trickleSpeed: 300,
  fixed: true,
  meteor: true,
  thick: false,
  spinner: true,
  ease: 'linear',
  color: '#1B95E0',
  direction: 'ltr+',
  spinnerPosition: 'right',
  trickleFunc: (n: number): number => {
    if (n >= 0 && n < 20) return 10;
    if (n >= 20 && n < 50) return 4;
    if (n >= 50 && n < 80) return 2;
    if (n >= 80 && n < 99) return 0.5;
    return 0;
  }
};

@Injectable({
  providedIn: 'root'
})
export class NgProgress {

  // Store progress bar instances
  private readonly _instances = new Map<string, NgProgressRef>();

  // Global config
  config: NgProgressConfig;

  constructor(@Optional() @Inject(NG_PROGRESS_CONFIG) config: NgProgressConfig) {
    this.config = config ? {...defaultConfig, ...config} : defaultConfig;
  }

  /**
   * Get or Create progress bar by ID
   */
  ref(id = 'root', config?: NgProgressConfig) {
    if (this._instances.has(id)) {
      // Get ProgressRef instance
      const progressRef = this._instances.get(id);
      if (config) {
        progressRef.setConfig({...this.config, ...config});
      }
      return progressRef;
    } else {
      // Create new ProgressRef instance
      const progressRef = new NgProgressRef({...this.config, ...config}, this.deleteInstance(id));
      return this._instances.set(id, progressRef).get(id);
    }
  }

  /**
   * Destroy all progress bar instances
   */
  destroyAll() {
    this._instances.forEach((ref: NgProgressRef) => ref.destroy());
  }

  /**
   * A destroyer function for each progress bar instance
   */
  private deleteInstance(id: string) {
    return () => {
      this._instances.delete(id);
    };
  }
}

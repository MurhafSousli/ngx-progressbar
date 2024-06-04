import { Injectable, Inject, Optional } from '@angular/core';
import { NgProgressRef } from './ng-progress-ref';
import { NgProgressConfig, ProgressConfig, NG_PROGRESS_CONFIG } from './ng-progress.interface';

const defaultConfig: ProgressConfig = {
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
  private readonly _instances: Map<string, NgProgressRef> = new Map<string, NgProgressRef>();

  // Global config
  config: ProgressConfig;

  constructor(@Optional() @Inject(NG_PROGRESS_CONFIG) config: NgProgressConfig) {
    this.config = config ? { ...defaultConfig, ...config } : defaultConfig;
  }

  /**
   * Get or Create progress bar by ID
   */
  ref(id: string = 'root', config?: NgProgressConfig): NgProgressRef {
    if (this._instances.has(id)) {
      // Get ProgressRef instance
      const progressRef: NgProgressRef = this._instances.get(id)!;
      if (config) {
        progressRef.setConfig({ ...this.config, ...config });
      }
      return progressRef as NgProgressRef;
    } else {
      // Create new ProgressRef instance
      const progressRef: NgProgressRef = new NgProgressRef({ ...this.config, ...config }, this.deleteInstance(id));
      return this._instances.set(id, progressRef).get(id) as NgProgressRef;
    }
  }

  /**
   * Destroy all progress bar instances
   */
  destroyAll(): void {
    this._instances.forEach((ref: NgProgressRef) => ref.destroy());
  }

  /**
   * A destroyer function for each progress bar instance
   */
  private deleteInstance(id: string): () => void {
    return () => {
      this._instances.delete(id);
    };
  }
}

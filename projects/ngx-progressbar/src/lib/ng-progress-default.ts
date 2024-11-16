import { NgProgressOptions } from './ng-progress.model';

export const defaultOptions: NgProgressOptions = {
  min: 8,
  max: 100,
  speed: 200,
  debounceTime: 0,
  trickleSpeed: 300,
  fadeOutSpeed: 50,
  relative: false,
  flat: false,
  spinner: false,
  direction: 'ltr+',
  spinnerPosition: 'right',
  trickleFunc: (n: number): number => {
    if (n >= 0 && n < 20) {
      return 10;
    }
    if (n >= 20 && n < 50) {
      return 4;
    }
    if (n >= 50 && n < 80) {
      return 2;
    }
    if (n >= 80 && n < 99) {
      return 0.5;
    }
    return 0;
  }
};

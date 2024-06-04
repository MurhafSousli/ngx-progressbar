import { Provider } from '@angular/core';
import { NG_PROGRESS_OPTIONS, NgProgressOptions, provideNgProgressOptions } from 'ngx-progressbar';
import { defaultOptions } from '../ng-progress-default';

describe('NgProgressbar Options', () => {
  it('[Default trickle function] should return the expected value based on the input', () => {
    expect(defaultOptions.trickleFunc(0)).toBe(10);
    expect(defaultOptions.trickleFunc(10)).toBe(10);
    expect(defaultOptions.trickleFunc(19)).toBe(10);
    expect(defaultOptions.trickleFunc(20)).toBe(4);
    expect(defaultOptions.trickleFunc(30)).toBe(4);
    expect(defaultOptions.trickleFunc(49)).toBe(4);
    expect(defaultOptions.trickleFunc(50)).toBe(2);
    expect(defaultOptions.trickleFunc(60)).toBe(2);
    expect(defaultOptions.trickleFunc(79)).toBe(2);
    expect(defaultOptions.trickleFunc(80)).toBe(0.5);
    expect(defaultOptions.trickleFunc(90)).toBe(0.5);
    expect(defaultOptions.trickleFunc(98)).toBe(0.5);
    expect(defaultOptions.trickleFunc(99)).toBe(0);
    expect(defaultOptions.trickleFunc(100)).toBe(0);
  });

  it('should return a Provider', () => {
    const config: NgProgressOptions = {
      min: 10,
      max: 100,
      // other options...
    };

    const provider: Provider = provideNgProgressOptions(config);
    expect(provider).toEqual({
      provide: NG_PROGRESS_OPTIONS,
      useValue: { ...defaultOptions, ...config },
    });
  });
});


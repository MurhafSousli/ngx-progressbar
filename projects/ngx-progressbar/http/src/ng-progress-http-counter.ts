import { InjectionToken, WritableSignal, signal } from '@angular/core';

export const NgProgressHttpCounter: InjectionToken<WritableSignal<number>> = new InjectionToken<WritableSignal<number>>('NgProgressHttpCounter', {
  providedIn: 'root',
  factory: () => signal(0),
});

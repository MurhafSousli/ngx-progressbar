import { Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NgProgressHttpInternal {
  readonly inProgressCount: WritableSignal<number> = signal(0);
}

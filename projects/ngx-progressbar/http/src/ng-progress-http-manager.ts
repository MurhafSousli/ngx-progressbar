import { Injectable, Signal, computed, inject } from '@angular/core';
import { NgProgressHttpCounter } from './ng-progress-http-counter';

@Injectable({
  providedIn: 'root'
})
export class NgProgressHttpManager {

  private readonly inProgressCount: Signal<number> = inject(NgProgressHttpCounter);

  readonly requestsCount: Signal<number> = computed(() => this.inProgressCount());

  readonly requestsLoading: Signal<boolean> = computed(() => !!this.inProgressCount());

}

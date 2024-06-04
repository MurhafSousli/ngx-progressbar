import { Injectable, Signal, computed, inject } from '@angular/core';
import { NgProgressHttpInternal } from './ng-progress-http-internal';

@Injectable({
  providedIn: 'root'
})
export class NgProgressHttpManager {

  private readonly internalManager: NgProgressHttpInternal = inject(NgProgressHttpInternal);

  readonly requestsCount: Signal<number> = computed(() => this.internalManager.inProgressCount());

  readonly requestsLoading: Signal<boolean> = computed(() => !!this.internalManager.inProgressCount());

}

/**
 * @license
 * Copyright ngx-progressbar All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/MurhafSousli/ngx-progressbar/blob/master/LICENSE
 */

import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ChangeDetectionStrategy,
  EventEmitter,
  ViewEncapsulation
} from '@angular/core';
import { NgProgress } from './ng-progress.service';
import { NgProgressRef } from './ng-progress-ref';
import { NgProgressState } from './ng-progress.interface';
import { Observable, Subscription} from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ng-progress',
  host: {
    'role': 'progressbar',
    '[attr.spinnerPosition]': 'spinnerPosition',
    '[attr.dir]': 'direction',
    '[attr.thick]': 'thick'
  },
  template: `
    <ng-container *ngIf="state$ | async; let state">
      <div class="ng-progress-bar"
            [class.-active]="state.active"
            [style.transition]="'opacity ' + speed + 'ms ' + ease">
        <div class="ng-bar-placeholder">
          <div class="ng-bar"
                [style.transform]="state.transform"
                [style.backgroundColor]="color"
                [style.transition]="state.active ? 'all ' + speed + 'ms ' + ease : 'none'">
            <div *ngIf="meteor" class="ng-meteor" [style.boxShadow]="'0 0 10px '+ color + ', 0 0 5px ' + color"></div>
          </div>
        </div>
        <div *ngIf="spinner" class="ng-spinner">
          <div class="ng-spinner-icon"
                [style.borderTopColor]="color"
                [style.borderLeftColor]="color"></div>
        </div>
      </div>
    </ng-container>
  `,
  styleUrls: ['./ng-progress.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false
})

export class NgProgressComponent implements OnInit, OnChanges, OnDestroy {

  private _started$: Subscription;
  private _completed$: Subscription;

  /** Progress bar worker */
  progressRef: NgProgressRef;

  /** Progress state stream */
  state$: Observable<{ active: boolean, transform: string }>;

  /** Creates a new instance if id is not already exists */
  @Input() id = 'root';

  /** Initializes inputs from the global config */
  @Input() spinnerPosition: 'left' | 'right' = this._ngProgress.config.spinnerPosition;
  @Input() direction: 'ltr+' | 'ltr-' | 'rtl+' | 'rtl-' = this._ngProgress.config.direction;
  @Input() ease: string = this._ngProgress.config.ease;
  @Input() color: string = this._ngProgress.config.color;
  @Input() meteor: boolean = this._ngProgress.config.meteor;
  @Input() spinner: boolean = this._ngProgress.config.spinner;
  @Input() thick: boolean = this._ngProgress.config.thick;
  @Input() max: number = this._ngProgress.config.max;
  @Input() min: number = this._ngProgress.config.min;
  @Input() speed: number = this._ngProgress.config.speed;
  @Input() trickleSpeed: number = this._ngProgress.config.trickleSpeed;
  @Input() trickleFunc: (n: number) => number = this._ngProgress.config.trickleFunc;
  @Input() debounceTime: number = this._ngProgress.config.debounceTime;
  @Output() started = new EventEmitter();
  @Output() completed = new EventEmitter();

  constructor(private _ngProgress: NgProgress) {
  }

  ngOnChanges() {
    if (this.progressRef instanceof NgProgressRef) {
      // Update progress bar config when inputs change
      this.progressRef.setConfig({
        max: (this.max > 0 && this.max <= 100) ? this.max : 100,
        min: (this.min < 100 && this.min >= 0) ? this.min : 0,
        speed: this.speed,
        trickleSpeed: this.trickleSpeed,
        trickleFunc: this.trickleFunc,
        debounceTime: this.debounceTime
      });
    }
  }

  ngOnInit() {
    // Get progress bar service instance
    this.progressRef = this._ngProgress.ref(this.id, {
      max: this.max,
      min: this.min,
      speed: this.speed,
      trickleSpeed: this.trickleSpeed,
      debounceTime: this.debounceTime
    });
    this.state$ = this.progressRef.state$.pipe(map((state: NgProgressState) => ({
      active: state.active,
      transform: `translate3d(${state.value}%,0,0)`
    })));
    /** Subscribes to started and completed events when user used them */
    if (this.started.observers.length) {
      this._started$ = this.progressRef.started.subscribe(() => this.started.emit());
    }
    if (this.completed.observers.length) {
      this._completed$ = this.progressRef.completed.subscribe(() => this.completed.emit());
    }
  }

  ngOnDestroy() {
    if (this._started$) {
      this._started$.unsubscribe();
    }
    if (this._completed$) {
      this._completed$.unsubscribe();
    }
    this._ngProgress.destroy(this.id);
  }

  start() {
    this.progressRef.start();
  }

  complete() {
    this.progressRef.complete();
  }

  inc(n?: number) {
    this.progressRef.inc(n);
  }

  set(n: number) {
    this.progressRef.set(n);
  }

  get isStarted() {
    return this.progressRef.isStarted;
  }
}

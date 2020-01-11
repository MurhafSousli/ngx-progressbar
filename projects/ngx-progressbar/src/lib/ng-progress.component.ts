import {
  Component,
  Input,
  Output,
  OnChanges,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
  EventEmitter,
  ViewEncapsulation
} from '@angular/core';
import { Observable, Subscription, SubscriptionLike} from 'rxjs';
import { map } from 'rxjs/operators';
import { NgProgress } from './ng-progress.service';
import { NgProgressRef } from './ng-progress-ref';
import { NgProgressState } from './ng-progress.interface';

@Component({
  selector: 'ng-progress',
  host: {
    'role': 'progressbar',
    '[attr.spinnerPosition]': 'spinnerPosition',
    '[attr.dir]': 'direction',
    '[attr.thick]': 'thick',
    '[attr.fixed]': 'fixed'
  },
  template: `
    <ng-container *ngIf="state$ | async; let state">
      <div class="ng-progress-bar"
            [attr.active]="state.active"
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
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NgProgressComponent implements OnInit, OnChanges, OnDestroy {

  private _started: SubscriptionLike = Subscription.EMPTY;
  private _completed: SubscriptionLike = Subscription.EMPTY;

  /** Progress bar worker */
  progressRef: NgProgressRef;

  /** Stream that emits progress state */
  state$: Observable<{ active: boolean, transform: string }>;

  /** Creates a new instance if id is not already exists */
  @Input() id = 'root';

  /** Initializes inputs from the global config */
  @Input() min: number = this._ngProgress.config.min;
  @Input() max: number = this._ngProgress.config.max;
  @Input() ease: string = this._ngProgress.config.ease;
  @Input() color: string = this._ngProgress.config.color;
  @Input() speed: number = this._ngProgress.config.speed;
  @Input() thick: boolean = this._ngProgress.config.thick;
  @Input() fixed: boolean = this._ngProgress.config.fixed;
  @Input() meteor: boolean = this._ngProgress.config.meteor;
  @Input() spinner: boolean = this._ngProgress.config.spinner;
  @Input() trickleSpeed: number = this._ngProgress.config.trickleSpeed;
  @Input() debounceTime: number = this._ngProgress.config.debounceTime;
  @Input() trickleFunc: (n: number) => number = this._ngProgress.config.trickleFunc;
  @Input() spinnerPosition: 'left' | 'right' = this._ngProgress.config.spinnerPosition;
  @Input() direction: 'ltr+' | 'ltr-' | 'rtl+' | 'rtl-' = this._ngProgress.config.direction;
  @Output() started = new EventEmitter();
  @Output() completed = new EventEmitter();

  get isStarted() {
    return this.progressRef.isStarted;
  }

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

    // Subscribe to progress state
    this.state$ = this.progressRef.state.pipe(
      map((state: NgProgressState) => ({
        active: state.active,
        transform: `translate3d(${state.value}%,0,0)`
      }))
    );

    // Subscribes to started and completed events on demand
    if (this.started.observers.length) {
      this._started = this.progressRef.started.subscribe(() => this.started.emit());
    }
    if (this.completed.observers.length) {
      this._completed = this.progressRef.completed.subscribe(() => this.completed.emit());
    }
  }

  ngOnDestroy() {
    this._started.unsubscribe();
    this._completed.unsubscribe();
    if (this.progressRef instanceof NgProgressRef) {
      this.progressRef.destroy();
    }
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
}

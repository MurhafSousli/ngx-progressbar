import {
  Component,
  Input,
  Output,
  ViewChild,
  EventEmitter,
  OnInit,
  OnChanges,
  OnDestroy,
  ElementRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { NgProgressRef } from './ng-progress-ref';
import { ProgressState } from './ng-progress.interface';
import { NgProgress } from './ng-progress.service';

@Component({
  standalone: true,
  selector: 'ng-progress',
  host: {
    'role': 'progressbar',
    '[attr.spinnerPosition]': 'spinnerPosition',
    '[attr.direction]': 'direction',
    '[attr.thick]': 'thick',
    '[attr.fixed]': 'fixed'
  },
  template: `
    <div #progressbarWrapper
         class="ng-progress-bar"
         [style.transition]="'opacity ' + speed + 'ms ' + ease">
      <div class="ng-bar-placeholder">
        <div #progressbar
             class="ng-bar"
             [style.background-color]="color">
          @if (meteor) {
            <div class="ng-meteor" [style.box-shadow]="'0 0 10px ' + color + ', 0 0 5px ' + color"></div>
          }
        </div>
      </div>
      @if (spinner) {
        <div class="ng-spinner">
          <div class="ng-spinner-icon"
               [style.border-top-color]="color"
               [style.border-left-color]="color"></div>
        </div>
      }
    </div>
  `,
  styleUrl: './ng-progress.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NgProgressComponent implements OnInit, OnChanges, OnDestroy {

  private _state!: Subscription;
  private _started!: Subscription;
  private _completed!: Subscription;

  /** Progress bar worker */
  progressRef!: NgProgressRef;

  /** Creates a new instance if id is not already exists */
  @Input() id: string = 'root';

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
  @Output() started: EventEmitter<void> = new EventEmitter<void>();
  @Output() completed: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('progressbar', { static: true }) progressElement!: ElementRef<HTMLElement>;
  @ViewChild('progressbarWrapper', { static: true }) progressWrapperElement!: ElementRef<HTMLElement>;

  get isStarted() {
    return this.progressRef?.isStarted;
  }

  constructor(private _ngProgress: NgProgress) {
  }

  ngOnChanges(): void {
    // Update progress bar config when inputs change
    this.progressRef?.setConfig({
      max: (this.max > 0 && this.max <= 100) ? this.max : 100,
      min: (this.min < 100 && this.min >= 0) ? this.min : 0,
      speed: this.speed,
      trickleSpeed: this.trickleSpeed,
      trickleFunc: this.trickleFunc,
      debounceTime: this.debounceTime
    });
  }

  ngOnInit(): void {
    // Get progress bar service instance
    this.progressRef = this._ngProgress.ref(this.id, {
      max: this.max,
      min: this.min,
      speed: this.speed,
      trickleSpeed: this.trickleSpeed,
      debounceTime: this.debounceTime
    });

    // Subscribe to progress state
    const progress: HTMLElement = this.progressElement.nativeElement;
    const progressWrapper: HTMLElement = this.progressWrapperElement.nativeElement;
    this._state = this.progressRef.state.pipe(
      tap((state: ProgressState) => {
        progress.style.transform = `translate3d(${ state.value }%,0,0)`;
        if (state.active) {
          progress.style.transition = `all ${ this.speed }ms ${ this.ease }`;
          progressWrapper.setAttribute('active', 'true');
        } else {
          progress.style.transition = 'none';
          progressWrapper.setAttribute('active', 'false');
        }
      })
    ).subscribe();

    // Subscribes to started and completed events on demand
    if (this.started.observed) {
      this._started = this.progressRef.started.subscribe(() => this.started.emit());
    }
    if (this.completed.observed) {
      this._completed = this.progressRef.completed.subscribe(() => this.completed.emit());
    }
  }

  ngOnDestroy(): void {
    this._state?.unsubscribe();
    this._started?.unsubscribe();
    this._completed?.unsubscribe();
    this.progressRef?.destroy();
  }

  start(): void {
    this.progressRef.start();
  }

  complete(): void {
    this.progressRef.complete();
  }

  inc(n?: number): void {
    this.progressRef.inc(n);
  }

  set(n: number): void {
    this.progressRef.set(n);
  }
}

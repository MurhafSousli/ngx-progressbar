import {Component, Input, OnInit, OnDestroy, style, animate, state, transition, trigger} from '@angular/core';
import {NgProgressService} from "../ng-progress.service";

@Component({
  selector: 'ng-progress',
  templateUrl: 'ng-progress.component.html',
  animations: [
    trigger('progressState', [
      state("", style({opacity: 1})),
      transition('void => *', [
        style({
          opacity: 0
        }),
        animate('0.2s ease-in')
      ]),
      transition('* => void', [
        animate('0.2s 10 ease-out', style({
          opacity: 0
        }))
      ])
    ])
  ]
})

export class NgProgressComponent implements OnInit, OnDestroy {

  @Input() set toggle(toggle) {
    if (toggle) this.start();
    else this.done();
  }

  /**   progress options  */
  @Input() minimum = 0.08;
  @Input() ease = 'linear';
  @Input() positionUsing = '';
  @Input() speed = 200;
  @Input() trickle = true;
  @Input() trickleSpeed = 200;
  @Input() showSpinner = true;
  @Input() direction = "leftToRightIncreased";
  @Input() color;

  /** current progress */
  private status: any = false;

  /** if progressbar child is displayed */
  private isActive;

  /** if progress is started*/
  isStarted() {
    return (this.status === 1 || !this.status) ? false : true;
  }

  constructor(private pService: NgProgressService) {

  }

  ngOnInit() {
    this.pService.onToggle.subscribe((value)=> {
      this.toggle = value;
    });
    this.pService.onSet.subscribe((value)=> {
      this.set(value);
    });
    this.pService.onIncrement.subscribe((value)=> {
      this.inc(value);
    });
  }

  ngOnDestroy() {
    this.pService.onIncrement.unsubscribe();
    this.pService.onSet.unsubscribe();
    this.pService.onToggle.unsubscribe();
  }


  set(n) {

    this.status = clamp(n, +this.minimum, 1);

    if (n === 1) {
      setTimeout(()=> {
        this.isActive = false;
      }, this.speed);
    }
    else {
      this.isActive = true;
    }
  }

  start() {
    if (!this.isStarted()) this.set(0);

    var work = () => {
      setTimeout(()=> {
        if (!this.isStarted()) return;
        this.inc();
        work();
      }, this.trickleSpeed$());
    };

    if (this.trickle) work();

    /** colorify */
    if (this.pService.colors) {
      let colors = this.pService.colors;
      let changeColor = () => {
        setTimeout(()=> {
          if (!this.isStarted()) return;
          this.color = colors[Math.floor(Math.random() * colors.length)];
          changeColor();
        }, this.pService.colorsInterval);
      };
      changeColor();
    }
  }


  done() {
    this.set(1);
  }

  inc(amount ?) {
    let n = this.status;
    if (!n) {
      this.start();
    }
    else if (n >= 1) {
      return;
    }
    else {
      if (typeof amount !== 'number' || amount >= 1) {
        if (n >= 0 && n < 0.25) {
          // Start out between 3 - 6% increments
          amount = (Math.random() * (5 - 3 + 1) + 3) / 100;
        } else if (n >= 0.25 && n < 0.65) {
          // increment between 0 - 3%
          amount = (Math.random() * 3) / 100;
        } else if (n >= 0.65 && n < 0.9) {
          // increment between 0 - 2%
          amount = (Math.random() * 2) / 100;
        } else if (n >= 0.9 && n < 0.99) {
          // finally, increment it .5 %
          amount = 0.005;
        } else {
          // after 99%, don't increment:
          amount = 0;
        }
      }
      n = clamp(n + amount, 0, 0.994);
      this.set(n);
    }
  }

  trickleSpeed$() {
    return this.trickleSpeed;
  }

}

var clamp = (n, min, max) => {
  if (n < min) return min;
  if (n > max) return max;
  return n;
};

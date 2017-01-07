import {Component, AfterContentInit, ChangeDetectionStrategy} from '@angular/core';
import {ProgressService} from "../ng2-progressbar";

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements AfterContentInit {

  options = {
    minimum: 0.08,
    ease: 'linear',
    positionUsing: 'margin',
    speed: 300,
    trickleSpeed: 300,
    showSpinner: true,
    direction: "leftToRightIncreased",
    topPosition: '0',
    color: '#29d',
    thick: false
  };

  directions = [
    'leftToRightIncreased',
    'rightToLeftIncreased',
    'leftToRightReduced',
    'rightToLeftReduced'
  ];

  positionMethods = [
    'margin',
    'translate3d',
    'translate'
  ];

  toggle;

  constructor(private progress: ProgressService) {
  }

  ngAfterContentInit() {
    this.toggle = true;
    setTimeout(()=> {
      this.toggle = false;
    }, 2000)
  }

}

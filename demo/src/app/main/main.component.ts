import {Component, AfterContentInit, ChangeDetectionStrategy} from '@angular/core';
import {NgProgressService} from "ng2-progressbar";

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements AfterContentInit {

  options = {
    minimum: 0.08,
    maximum: 1,
    ease: 'linear',
    positionUsing: 'translate',
    speed: 200,
    trickleSpeed: 300,
    showSpinner: true,
    direction: "leftToRightIncreased",
    color: '#CC181E',
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

  constructor(private progress: NgProgressService) {
  }

  ngAfterContentInit() {
    this.toggle = true;
    setTimeout(()=> {
      this.toggle = false;
    }, 2000)
  }

  start(){
    this.progress.start();
    this.toggle = true;
  }
  done(){
    this.progress.done();
    this.toggle = false;
  }

}

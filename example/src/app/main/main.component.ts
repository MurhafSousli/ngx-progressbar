import {Component, AfterContentInit} from '@angular/core';
import {NgProgressService} from "../ng2-progressbar";

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements AfterContentInit {

  options = {
    minimum: 0.08,
    ease: 'linear',
    positionUsing: 'marginLeft',
    speed: 300,
    trickle: true,
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

  positionings = [
    'marginLeft',
    'translate3d',
    'translate'
  ];

  colors = [
    '#FE424D',
    'brown',
    '#8CC152',
    '#4A89DC',
    '#FF9600',
    '#BD29C4', //hot purple
    '#FF007F', //hotpink
    'limegreen',
    '#1AA6B7' //cyan
  ];

  toggle;

  constructor(private pService: NgProgressService) {
  }

  ngAfterContentInit() {
    this.start();
    setTimeout(()=> {
      this.done();
    }, 2000)
  }

  colorify() {
    this.pService.colors = this.colors;
    this.pService.start();
    this.toggle = true;
  }

  start() {
    this.pService.start();
    this.toggle = true;
  }

  inc(n) {
    this.pService.inc(n);
  }

  set(n) {
    this.pService.set(n);
  }

  done() {
    this.pService.done();
    this.toggle = false;
    this.pService.colors = [];
  }
}

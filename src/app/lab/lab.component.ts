import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { NgProgress, NgProgressState } from '../progressbar';

import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.scss']
})
export class LabComponent implements OnInit {

  directions = [
    'leftToRightIncreased',
    'rightToLeftIncreased',
    'leftToRightReduced',
    'rightToLeftReduced'
  ];

  spinnerPosition = [
    'right',
    'left'
  ];

  toggle;

  @Input() options: any = {};
  @Output() optionsChange = new EventEmitter(true);

  constructor(private progress: NgProgress) {

  }

  ngOnInit() {

    /** For demo purpose */
    this.progress.state$
      .map((state: NgProgressState) => state.active)
      .distinctUntilChanged()
      .subscribe((toggle: boolean) => {
        this.toggle = toggle;
      });
  }

  /** For demo purpose */
  toggleChanged(e) {
    if (e) {
      this.progress.start();
    } else {
      this.progress.done();
    }
  }

}

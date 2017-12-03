import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { NgProgress, NgProgressState } from '@ngx-progressbar/core';
import { map, distinctUntilChanged, tap } from 'rxjs/operators';

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
    this.progress.state$.pipe(
      map((state: NgProgressState) => state.active),
      distinctUntilChanged(),
      tap((toggle: boolean) => this.toggle = toggle)
    ).subscribe();
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

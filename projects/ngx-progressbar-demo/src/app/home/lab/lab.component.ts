import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NgProgressConfig } from 'ngx-progressbar';
// import { NgProgressConfig } from '../../../../../ngx-progressbar/src/public-api';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabComponent {

  directions = [
    'ltr+',
    'ltr-',
    'rtl+',
    'rtl-'
  ];

  spinnerPosition = [
    'right',
    'left'
  ];

  @Input() options: NgProgressConfig = {};
  @Output() optionsChange = new EventEmitter(true);

}

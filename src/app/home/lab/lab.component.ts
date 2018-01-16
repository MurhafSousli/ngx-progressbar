import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false
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

  @Input() options: any = {};
  @Output() optionsChange = new EventEmitter(true);

}

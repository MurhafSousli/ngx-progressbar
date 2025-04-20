import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgProgressOptions } from 'ngx-progressbar';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrl: './lab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule]
})
export class LabComponent {

  directions: string[] = [
    'ltr+',
    'ltr-',
    'rtl+',
    'rtl-'
  ];

  spinnerPosition: string[] = [
    'right',
    'left'
  ];

  @Input() options: NgProgressOptions = {};
  @Output() optionsChange: EventEmitter<boolean> = new EventEmitter(true);

}

import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgProgressOptions } from 'ngx-progressbar';

@Component({
  standalone: true,
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, CommonModule]
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

  @Input() options: NgProgressOptions = {};
  @Output() optionsChange = new EventEmitter(true);

}

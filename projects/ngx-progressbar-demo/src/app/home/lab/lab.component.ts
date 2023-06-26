import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgProgressConfig } from 'ngx-progressbar';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
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

  @Input() options: NgProgressConfig = {};
  @Output() optionsChange = new EventEmitter(true);

}

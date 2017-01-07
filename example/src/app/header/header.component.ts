import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  logo = prefixRepo('../assets/img/progress-logo.png');

}

var prefixRepo = (path) => {
  return  'ng2-progressbar/' + path;
};

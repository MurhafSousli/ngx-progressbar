import { Component } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  logo = prefixRepo('../assets/img/ng-progress-logo.png');

}

var prefixRepo = (path) => {
  return  'ng2-progressbar/' + path;
};
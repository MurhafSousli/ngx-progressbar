### Usage

Use the directive `ngProgressRouter` to start and complete the progress bar with your router navigation.

**Example:**

```ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgProgressbar } from 'ngx-progressbar';
import { NgProgressRouter } from 'ngx-progressbar/router';

@Component({
  selector: 'app-root',
  imports: [NgProgressbar, NgProgressRouter, RouterOutlet],
  template: `
    <ng-progress ngProgressRouter/>
    <router-outlet/>   
  `
})
export class AppComponent {
}
```

### Custom router events

```ts
import { GuardsCheckEnd, NavigationEnd } from '@angular/router';
import { provideNgProgressRouter } from '@ngx-progressbar/router';

bootstrapApplication(AppComponent, {
  providers: [
    provideNgProgressRouter({
      startEvents: [GuardsCheckEnd],
      completeEvents: [NavigationEnd],
      minDuration: 1000
    })
  ]
})
```

> If Typescript complained about `startEvents` or `completeEvents` values with red underlines, don't worry it will compile just fine. optionally, you can use type assertion e.g. `completeEvents: [NavigationEnd] as Type<Event>[]`.

### NgProgressRouter API

| Name               | Default                                            | Description                                                                   |
| ------------------ | :------------------------------------------------: |-------------------------------------------------------------------------------|
| **minDuration**    | 0                                                  | *The minimum duration (in ms) the progress bar should run before completing.* |
| **startEvents**    | [NavigationStart]                                  | *Router events that starts the progressbar.*                                  |
| **completeEvents** | [NavigationEnd, NavigationCancel, NavigationError] | *Router events that completes the progressbar.*                               |


A list of available router events can be found [https://angular.dev/guide/routing/router-reference#router-events](https://angular.dev/guide/routing/router-reference#router-events)

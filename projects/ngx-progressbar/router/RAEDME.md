## NgProgress + Router

The `NgProgressRouter` directive allows you to easily integrate a progress bar with your Angular router navigation.

### Usage

To use the `NgProgressRouter` directive, simply add it to your component along with the `NgProgressbar` component:

```html
<ng-progress ngProgressRouter></ng-progress>
<router-outlet></router-outlet>
```

This will automatically start the progress bar on navigation start and complete it when the navigation finishes.

### Custom Router Events

If you need more control over when the progress bar should start and complete, you can use the `provideNgProgressRouter` function to configure the directive:

```typescript
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

In this example, the progress bar will start on the `GuardsCheckEnd` event and complete on the `NavigationEnd` event. Additionally, the progress bar will run for a minimum of 1000 milliseconds (1 second) before completing.

### NgProgressRouter API

The `provideNgProgressRouter` function accepts the following configuration options:

| Name               | Type                                             | Default                                            | Description                                                                   |
| ------------------ | :-----------------------------------------------: | :------------------------------------------------: |-------------------------------------------------------------------------------|
| **minDuration**    | `number`                                         | `0`                                                | The minimum duration (in ms) the progress bar should run before completing.   |
| **startEvents**    | `RouterEvent[]`                                  | `[NavigationStart]`                                | Router events that start the progress bar.                                     |
| **completeEvents** | `RouterEvent[]`                                  | `[NavigationEnd, NavigationCancel, NavigationError]` | Router events that complete the progress bar.                                |

You can find a list of available router events in the [Angular Router Reference documentation](https://angular.dev/guide/routing/router-reference#router-events).

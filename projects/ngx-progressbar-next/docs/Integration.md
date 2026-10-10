The `ngProgressRef` directive provides a way to integrate the progress bar with other UI components, such as material progress bars.

### Examples

#### Integrating with `<mat-progress-bar>`

```html
<ng-container ngProgressRef #progressRef="ngProgressRef">
  @if (progressRef.active()) {
  <mat-progress-bar [value]="progressRef.progress()"/>
  }
</ng-container>
```

This example shows the material progress bar only when the progress is active, and updates the value based on the progress.

#### Integrating with `<mat-progress-bar>` with animation

```html
<mat-progress-bar ngProgressRef
                  #progressRef="ngProgressRef"
                  [@fadeInOut]="progressRef.active()"
                  [value]="progressRef.progress()"/>
```

This example uses the `[@fadeInOut]` animation to show and hide the progress bar based on the active state.

### `NgProgressRef` Directive API

The `NgProgressRef` directive provides the following properties and methods:

| Name                  | Default  | Description                                                |
|-----------------------|:--------:|------------------------------------------------------------|
| **[direction]**       |   ltr+   | *Progress bar direction (`ltr+`, `ltr-`, `rtl+`, `rtl-`).* |
| **[trickleSpeed]**    |   300    | *Progress trickling speed in ms.*                          |
| **[fadeOutSpeed]**    |    50    | *Progress fade out speed in ms.*                           |
| **[trickleFunc]**     | Function | *A **function** that returns the trickling amount.*        |
| **[debounceTime]**    |    0     | *Debounce time before starting the progress bar in ms.*    |
| **[speed]**           |   200    | *Transition speed in ms.*                                  |
| **[min]**             |    8     | *Progress initial starting value.*                         |
| **[max]**             |   100    | *Progress maximum value.*                                  |
| **[spinner]**         |  false   | *Display spinner.*                                         |
| **[spinnerPosition]** |  right   | *Spinner position. (`right`, `left`).*                     |
| **[relative]**        |  false   | *Position the progress bar relative to parent.*            |
| **[flat]**            |  false   | *Flat style (disables meteor style).*                      |
| **(started)**         |    -     | *Stream that emits when the progress bar has started.*     |
| **(completed)**       |    -     | *Stream that emits when the progress bar has completed.*   |
| **active**            |    -     | *Signal that emits the active state.*                      |
| **progress**          |    -     | *Signal that emits the progress.*                          |
| **start()**           |    -     | *Starts the progress.*                                     |
| **set(n)**            |    -     | *Sets a percentage n (where n is between 0-100).*          |
| **inc(n)**            |    -     | *Increments by n (where n is between 0-100).*              |
| **complete()**        |    -     | *Completes the progress.*                                  |

### Automagic features

The library provides two additional directives that can automatically integrate the progress bar with common use cases:

1. `ngProgressHttp`: Starts and completes the progress bar when HTTP requests are made.

```html
<mat-progress-spinner ngProgressHttp
                      #progressRef="ngProgressRef"
                      [@fadeInOut]="progressRef.active()"
                      [value]="progressRef.progress()"/>
```

2. `ngProgressRouter`: Starts and completes the progress bar when the router navigates.

```html
<mat-progress-spinner ngProgressRouter
                      #progressRef="ngProgressRef"
                      [@fadeInOut]="progressRef.active()"
                      [value]="progressRef.progress()">
</mat-progress-spinner>
```

These directives automatically handle the progress bar lifecycle, making it easy to integrate with common use cases.

## Integration

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

| Name                                | Description                                          |
|-------------------------------------|------------------------------------------------------|
| NgProgressRef.**active**            | *Signal that emits the active state.*                |
| NgProgressRef.**progress**          | *Signal that emits the progress.*                    |
| NgProgressRef.**started**           | *Stream that emits when the progress has started.*   |
| NgProgressRef.**completed**         | *Stream that emits when the progress has completed.* |
| NgProgressRef.**start()**           | *Starts the progress.*                               |
| NgProgressRef.**set(n)**            | *Sets a percentage n (where n is between 0-100).*    |
| NgProgressRef.**inc(n)**            | *Increments by n (where n is between 0-100).*        |
| NgProgressRef.**complete()**        | *Completes the progress.*                            |
| NgProgressRef.**setConfig(config)** | *Sets the progress bar config.*                      |

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

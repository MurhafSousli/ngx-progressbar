## Overview

The progress bar component library provides a simple and customizable way to add progress bars to your application. The library includes the `NgProgress` component, which can be used to display a progress bar in your application.

## Installation

To use the progress bar component library, you will need to install the `ngx-progressbar` package. You can do this using npm or yarn:

```
npm install ngx-progressbar
```

## Usage

### Accessing the Progress Bar Directly from the Template

To add a progress bar to your template and access it directly, use the `<ng-progress>` component and a template reference variable:

```html
<ng-progress #progressBar="ngProgress"/>

<button (click)="progressBar.start()">Start</button>
<button (click)="progressBar.complete()">Complete</button>
```

### Accessing the Progress Bar from the Component Code

Alternatively, you can add the progress bar and access the instance using the `@ViewChild` decorator:

```typescript
import { NgProgress } from 'ngx-progressbar';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [NgProgress],
  template: `
    <ng-progress/>
  `
})
export class HomeComponent {
  @ViewChild(NgProgress) progressBar: NgProgress;

  start() {
    this.progressBar.start();
  }
}
```

### NgProgress Component API

| Name                  | Default  | Description                                                |
|-----------------------|:--------:|------------------------------------------------------------|
| **[direction]**       |   ltr+   | *Progress bar direction (`ltr+`, `ltr-`, `rtl+`, `rtl-`).* |
| **[trickleSpeed]**    |   300    | *Progress trickling speed in ms.*                          |
| **[trickleFunc]**     | Function | *A **function** that returns the trickling amount.*        |
| **[debounceTime]**    |    0     | *Debounce time before starting the progress bar in ms.*    |
| **[speed]**           |   200    | *Transition speed in ms.*                                  |
| **[min]**             |    8     | *Progress initial starting value.*                         |
| **[max]**             |   100    | *Progress maximum value.*                                  |
| **[ease]**            |  linear  | *Progress [ease function](http://easings.net/).*           |
| **[spinner]**         |  false   | *Display spinner.*                                         |
| **[spinnerPosition]** |  right   | *Spinner position. (`right`, `left`).*                     |
| **[relative]**        |  false   | *Position the progress bar relative to parent.*            |
| **[flat]**            |  false   | *Flat style (disables meteor style).*                      |
| **(started)**         |    -     | *Stream that emits when the progress bar has started.*     |
| **(completed)**       |    -     | *Stream that emits when the progress bar has completed.*   |
| **start()**           |    -     | *Starts the progress bar.*                                 |
| **set(n)**            |    -     | *Sets a percentage n (where n is between 0-100).*          |
| **inc(n)**            |    -     | *Increments by n (where n is between 0-100).*              |
| **complete()**        |    -     | *Completes the progress bar.*                              |
| **progressRef**       |    -     | *`NgProgressRef` instance of the progress bar.*            |


Here is an example of how to use the `<ng-progress>` component with some of the available options:

```html
<ng-progress direction="ltr+" min="20" max="1" speed="200" trickleSpeed="300"
             ease="linear" relative flat spinner spinnerPosition="left"
             (started)="onStarted()" (complete)="onComplete()"/>
```

## Automagic features

#### Use `ngProgressHttp` directive to start/complete the progress bar with http requests.

```html
<ng-progress ngProgressHttp/>
```

 > More info on customizing `ngProgressHttp` can be found in http guide.

#### Use `ngProgressRouter` to start/complete the progress bar with router events.

```html
<ng-progress ngProgressRouter/>
```

> More info on customizing `ngProgressRouter` can be found in router guide.

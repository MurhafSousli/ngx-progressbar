<p align="center">
  <img height="200px" width="200px" style="text-align: center;" src="https://cdn.rawgit.com/MurhafSousli/ngx-progressbar/master/src/assets/logo.svg">
  <h1 align="center">Angular Progressbar</h1>
</p>

A nanoscopic progress bar. Featuring realistic trickle animations to convince your users that something is happening!

___
[![npm](https://img.shields.io/badge/demo-online-ed1c46.svg)](https://murhafsousli.github.io/ngx-progressbar/)
[![npm](https://img.shields.io/npm/v/@ngx-progressbar/core.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ngx-progressbar/core) 
[![Build Status](https://travis-ci.org/MurhafSousli/ngx-progressbar.svg?branch=master)](https://travis-ci.org/MurhafSousli/ngx-progressbar) 
[![npm](https://img.shields.io/npm/l/express.svg?maxAge=2592000)](https://github.com/MurhafSousli/ngx-progressbar/blob/master/LICENSE)

### Before you begin!

This is the documentation for **ngx-progressbar** version 4.x (Angular >= 5) and version 5.x (Angular >= 6)

- For **ngx-progressbar** version 3.x (Angular >= 5), See this [documentation](README_V3.md)
- For **ngx-progressbar** version 2.x (Angular 2 & 4), See this [documentation](https://github.com/MurhafSousli/ngx-progressbar/wiki)

***

## Table of Contents

- [Live Demo](https://MurhafSousli.github.io/ngx-progressbar)
- [Installation](#installation)
- [Usage](#usage) | [stackblitz](https://stackblitz.com/edit/ngx-progressbar)
- [Automagic Usage](#automagic)
  - [Http requests](#http) | [http stackblitz](https://stackblitz.com/edit/ngx-progressbar-http)
  - [Router events](#router) | [routing stackblitz](https://stackblitz.com/edit/ngx-progressbar-router)
- [Integration](#integration)
- [Multiple progress bars](#multiple_instances) | [multiple progress bars stackblitz](https://stackblitz.com/edit/ngx-progressbar-mutliple-instances)
- [Support](#support)
- [Issues](#issues)
- [Author](#author)
- [Credits](#credits)

<a name="installation"/>

## Installation

NPM

```
$ npm i -S @ngx-progressbar/core
```

YARN

```
yarn add @ngx-progressbar/core
```

[stackblitz](https://stackblitz.com/edit/ngx-progressbar)

<a name="usage"/>

## Usage

Import `NgProgressModule` in the root module

```ts
import { NgProgressModule } from '@ngx-progressbar/core';

@NgModule({
  imports: [
    NgProgressModule.forRoot(config)
  ]
})
```

**config** is an optional parameter to set a global config for the progress bar(s)

**Example 1:** Accessing the progress bar from the template

```html
<ng-progress #progressBar></ng-progress>
<button (click)="progressBar.start()">Start</button>
<button (click)="progressBar.complete()">Complete</button>
```

**Example 2:** Accessing the progress bar from parent component

```ts
@Component({
  selector: 'app-home',
  template: `
    <ng-progress></ng-progress>
  `
})
export class HomeComponent implements AfterViewInit {

  @ViewChild(NgProgressComponent) progressBar: NgProgressComponent;

  ngAfterViewInit() {
    this.progressBar.start();
  }
}  
```

**Example 3:** Accessing the progress bar from anywhere

```ts
@Component({
  selector: 'app-header',
  template: `
    <ng-progress></ng-progress>
  `
})
export class HeaderComponent {
}

@Component({
  selector: 'app-home'
})
export class HomeComponent {

  constructor(public progress: NgProgress) {
  }

  startLoading() {
    this.progress.start();
  }

  completeLoading() {
    this.progress.complete();
  }

  changeProgressColor() {
    this.progress.setConfig({ color: 'green' });
  }
}
```

## NgProgress Component

```html
<ng-progress [direction]="'ltr+'" [min]="20" [max]="1" [speed]="200"  [trickleSpeed]="300"
             [spinner]="true" [spinnerPosition]="'left'" [thick]="false" [meteor]="true"
             [color]="'red'" [ease]="'linear'"></ng-progress>
```

| Name                  | Default       | Description                                                |
| --------------------- | :-----------: | ---------------------------------------------------------- |
| **[id]**              | root          | *For multiple progress bars.*                              |
| **[direction]**       | ltr+          | *Progress bar direction (`ltr+`, `ltr-`, `rtl+`, `rtl-`).* |
| **[trickleSpeed]**    | 300           | *Progress trickling speed in ms.*                          |
| **[trickleFunc]**     | Function      | *A **function** that returns the trickling amount.*        |
| **[debounceTime]**    | 0             | *Debounce time before starting the progress bar in ms.*    |
| **[speed]**           | 200           | *Transition speed in ms.*                                  |
| **[min]**             | 8             | *Progress initial starting value.*                         |
| **[max]**             | 100           | *Progress maximum value.*                                  |
| **[ease]**            | linear        | *Progress [ease function](http://easings.net/).*           |
| **[spinner]**         | true          | *Display spinner.*                                         |
| **[spinnerPosition]** | right         | *Spinner position. (`right`, `left`).*                     |
| **[color]**           | #1B95E0       | *Progress bar color.*                                      |
| **[thick]**           | false         | *A thicker size of the progress bar.*                      |
| **[meteor]**          | true          | *Meteor style.*                                            |
| **(started)**         | -             | *Stream that emits when the progress bar has started.*     |
| **(completed)**       | -             | *Stream that emits when the progress bar has completed.*   |
| **start()**           | -             | *Starts the progress bar.*                                 |
| **set(n)**            | -             | *Sets a percentage n (where n is between 0-100).*          |
| **inc(n)**            | -             | *Increments by n (where n is between 0-100).*              |
| **complete()**        | -             | *Completes the progress bar.*                              |
| **isStarted**         | -             | *Checks if the progress has started.*                      |
| **progress**          | -             | *`NgProgressRef` instance of the progress bar.*            |

***

> ## NgProgressRef Class

>    This class is used internally, you probably have no use for it unless you want to configure a custom progress bar like in the [integration example](#integration).

>    | Name                          | Description                                           |
>    | ----------------------------- | ----------------------------------------------------- |
>    | NgProgressRef.**start()**     | *Starts the progress.*                                |
>    | NgProgressRef.**set(n)**      | *Sets a percentage n (where n is between 0-100).*     |
>    | NgProgressRef.**inc(n)**      | *Increments by n (where n is between 0-100).*         |
>    | NgProgressRef.**complete()**  | *Completes the progress.*                             |
>    | NgProgressRef.**started**     | *Stream that emits when the progress has started.*    |
>    | NgProgressRef.**completed**   | *Stream that emits when the progress has completed.*  |
>    | NgProgressRef.**isStarted**   | *Checks if the progress has started.*                 |
>    | NgProgressRef.**state$**      | *Stream that emits when progress has changed.*        |

***

## NgProgress Service

NgProgress Service is used to control the progress bar(s) from anywhere in the app

| Name                           | Description                                           |
| ------------------------------ | ----------------------------------------------------- |
| NgProgress.**start(id?)**      | *Starts the progress.*                                |
| NgProgress.**set(n, id?)**     | *Sets a percentage n (where n is between 0-100).*     |
| NgProgress.**inc(n, id?)**     | *Increments by n (where n is between 0-100).*         |
| NgProgress.**complete(id?)**   | *Completes the progress.*                             |
| NgProgress.**started(id?)**    | *Stream that emits when the progress has started.*    |
| NgProgress.**completed(id?)**  | *Stream that emits when the progress has completed.*  |
| NgProgress.**isStarted(id?)**  | *Checks if the progress has started.*                 |
| NgProgress.**destroy(id?)**    | *Destroys `NgProgressRef` instance by id.*            |
| NgProgress.**destroyAll()**    | *Destroys all existing `NgProgressRef` instances.*    |
| NgProgress.**ref(id?)**        | *Returns `NgProgressRef` instance by id.*             |
| NgProgress.**setConfig(config, id?)** | *Sets config for a `NgProgressRef` instance.*  |

You don't have to specify the id parameter unless you are using more than one progress bar

## Global config

You can set the default config for all progress bars in **NgProgressModule**.

Example:

```ts
import { NgProgressModule } from '@ngx-progressbar/core';

@NgModule({
  imports: [
    NgProgressModule.forRoot({
      tricklSpeed: 200,
      min: 20,
      meteor: false
    })
  ]
})
```

**NgProgressConfig interface**

| Name                | Default       | Description                                                |
| ------------------- | :-----------: | ---------------------------------------------------------- |
| **direction**       | ltr+          | *Progress bar direction (`ltr+`, `ltr-`, `rtl+`, `rtl-`).* |
| **trickleSpeed**    | 300           | *Progress trickling speed in ms.*                          |
| **trickleFunc**     | Function      | *A **function** that returns the trickling amount.*        |
| **debounceTime**    | 0             | *Debounce time before starting the progress bar in ms.*    |
| **speed**           | 200           | *Transition speed in ms.*                                  |
| **min**             | 8             | *Progress initial starting value.*                         |
| **max**             | 100           | *Progress maximum value.*                                  |
| **ease**            | linear        | *Progress [ease function](http://easings.net/).*           |
| **spinner**         | true          | *Display spinner.*                                         |
| **spinnerPosition** | right         | *Spinner position. (`right`, `left`).*                     |
| **color**           | #1B95E0       | *Progress bar color.*                                      |
| **thick**           | false         | *A thicker size of the progress bar.*                      |
| **meteor**          | true          | *Meteor style.*                                            |

<a name="automagic"/>

## Automagic loading bar

If you only need a progress bar for multiple requests, there is a simple _plug and play_ module. It does the trick.

<a name="http"/>

**Installation**:

NPM

```
$ npm i -S @ngx-progressbar/{core,http}
```

YARN

```
$ yarn add @ngx-progressbar/{core,http}
```

```ts
import { HttpClientModule } from '@angular/common/http';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';

@NgModule({
  imports: [
    // ...
    HttpClientModule,
    NgProgressModule.forRoot(),
    NgProgressHttpModule
  ]
})
```

And just put the component in your template

```html
<ng-progress></ng-progress>
```

See [Http stackblitz](https://stackblitz.com/edit/ngx-progressbar-http)

The progress will start and complete automatically with your HTTP requests. no need to use `NgProgress` service to call start()/complete() manually.

<a name="router"/>

## For router events

If you need the progress bar to start for navigating between your app routes, add this module

**Installation:**

NPM

```
$ npm i -S @ngx-progressbar/{core,router}
```

YARN

```
$ yarn add @ngx-progressbar/{core,router}
```

To start the progress bar on router events use this code:

```ts
import { RouterModule } from '@angular/router';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressRouterModule } from '@ngx-progressbar/router';

@NgModule({
  imports: [
    RouterModule.forRoot(...),
    NgProgressModule.forRoot(),
    NgProgressRouterModule
  ],
})
```

And just put the component in your **AppComponent** template

```html
<ng-progress></ng-progress>
```

See [routing stackblitz](https://stackblitz.com/edit/ngx-progressbar-router)

<a name="integration"/>

## Integrating custom loaders

You can integrate any progress bar or spinner by subscribing to `NgProgress.state$`, here is an example of using Material progress bar

```ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgProgress, progressRef } from '@ngx-progressbar/core';

@Component({
  selector: 'app',
  template: `
   <ng-container *ngIf="progressRef.state$ | async; let state">
      <mat-progress-bar *ngIf="state.active" [value]="state.value"></mat-progress-bar>
   </ng-container>
  `
})
export class App implements OnInit, OnDestroy {

  progressRef: NgProgressRef;

  constructor(private ngProgress: NgProgress) {
  }

  ngOnInit() {
    this.progressRef = this.ngProgress.ref();

    // Start the progress
    this.progressRef.start();
    // or
    this.ngProgress.start();
  }

  ngOnDestroy() {
    // Destroy NgProgressRef instance using `NgProgress` service.
    this.ngProgress.destroy();

    // DO NOT DESTROY USING `progressRef` ITSELF.
    // this.progressRef.destroy();
  }
}
```

In this case you don't need to use `<ng-progress>` in your template :)

<a name="multiple_instances"/>

## Using multiple progress bars

If you need more than one the progress bar, just give it a unique `id`

```html
<ng-progress id="login-loader"></ng-progress>
<ng-progress id="posts_Loader"></ng-progress>
<ng-progress id="mainLoader"></ng-progress>
```

Under the hood, each progress bar will get a unique progress worker.

See [multiple progress bars stackblitz](https://stackblitz.com/edit/ngx-progressbar-mutliple-instances)

<a name="support"/>

## Support

[![npm](https://c5.patreon.com/external/logo/become_a_patron_button.png)](https://www.patreon.com/bePatron?u=5594898)

<a name="issues"/>

## Issues

If you identify any errors in the library, or have an idea for an improvement, please open an [issue](https://github.com/MurhafSousli/ngx-progressbar/issues). I am excited to see what the community thinks of this project, and I would love your input!

<a name="author"/>

## Author

 **[Murhaf Sousli](http://murhafsousli.com)**

- [github/murhafsousli](https://github.com/MurhafSousli)
- [twitter/murhafsousli](https://twitter.com/MurhafSousli)

<a name="credit"/>

## Credits

 Inspired by [NProgress.js by Rico Sta. Cruz.](https://github.com/rstacruz/nprogress)

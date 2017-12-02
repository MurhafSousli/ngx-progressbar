<p align="center">
  <img height="200px" width="200px" style="text-align: center;" src="https://cdn.rawgit.com/MurhafSousli/ngx-progressbar/79d7fbba96cc528238e67aadb85eafe8653198de/assets/logo.svg">
  <h1 align="center">Angular Progressbar</h1>
</p>

A nanoscopic progress bar. Featuring realistic trickle animations to convince your users that something is happening!

___
[![npm](https://img.shields.io/badge/demo-online-ed1c46.svg)](https://murhafsousli.github.io/ngx-progressbar/)
[![npm](https://img.shields.io/npm/v/@ngx-progressbar/core.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ngx-progressbar) 
[![Build Status](https://travis-ci.org/MurhafSousli/ngx-progressbar.svg?branch=master)](https://www.npmjs.com/package/ngx-progressbar) 
[![npm](https://img.shields.io/npm/l/express.svg?maxAge=2592000)](/LICENSE)

## Table of Contents

- [Live Demo](https://MurhafSousli.github.io/ngx-progressbar)
- [Installation](#installation)
- [Usage](#usage)
- [Automagic Usage](#automagic)
- [Misc](#misc)
- [Issues](#issues)
- [Author](#author)
- [Credits](#credits)

<a name="installation"/>

## Installation

Install it with npm

`npm install --save ngx-progressbar`

### SystemJS

If you are using SystemJS, you should also adjust your configuration to point to the UMD bundle.

In your systemjs config file, map needs to tell the System loader where to look for `ngx-progressbar`:

```js
map: {
  'ngx-progressbar': 'node_modules/ngx-progressbar/bundles/ngx-progressbar.umd.js',
}
```

Here is a working [plunker](https://plnkr.co/edit/OEVjavH87Hk8GdAqdayK?p=preview). | [stackblitz](https://stackblitz.com/edit/ngx-progressbar)

<a name="usage"/>

## Usage

Import `NgProgressModule` in the root module

```ts
import { NgProgressModule } from 'ngx-progressbar';

@NgModule({
  imports: [
    // ...
    NgProgressModule
  ]
})
```

In your template

```html
<ng-progress></ng-progress>
```

Add `NgProgress` service wherever you want to use the progressbar.

```ts
import { NgProgress } from 'ngx-progressbar';

export class SomeComponent {

  constructor(public progress: NgProgress) {
  }

  ngOnInit(){
      /** request started */
      this.progress.start();
      this.http.get(url).subscribe(res){
          /** request completed */
          this.progress.done();
      }
  }
}
```

## NgProgress Service

- `NgProgress.start()`  *Shows the progress bar*

- `NgProgress.set(n)`   *Sets a percentage n (where n is between 0-1)*

- `NgProgress.inc(n)`   *Increments by n (where n is between 0-1)*

- `NgProgress.done()`   *Completes the progress*

- `NgProgress.started()`  *Progress started event*

- `NgProgress.ended()`    *Progress ended event*

## NgProgress Component

```html
<ng-progress  [minimum]="0.15" [maximum]="1" [speed]="200" [ease]="'linear'"
              [showSpinner]="false" [spinnerPosition]="'right'" [direction]="'rightToLeftIncreased'"
              [color]="'red'" [trickleSpeed]="250" [thick]="false"
></ng-progress>
```

- **[minimum]**: between `0.0` to `1.0`.

  Progress initial starting value, default `0.08`

- **[maximum]**: between `0.0` to `1.0`.

  Progress maximum value, default `1.0`

- **[ease]**: [Any easing function](http://easings.net/)

  Progress animation ease, default `linear`.

- **[speed]**: in milliseconds.

  Transition speed,  default `200`.

- **[trickleSpeed]**: in milliseconds.

  Progress trickling speed, default `300`.

- **[direction]**:  `leftToRightIncreased`, `leftToRightReduced` , `rightToLeftIncreased`, `rightToLeftReduced`.

  Progressbar direction for LTR and RTL websites, default: `leftToRightIncreased`.

- **[spinnerPosition]**: `left`, `right`.

  Spinner position, default: `right`

- **[color]**: any color format `#1eb77f`, `brown`, `rgb(30, 183, 127)`.

  Set the progressbar color, default: `#29d`

- **[spinner]**: boolean

  Display the spinner, default: `true`.

- **[thick]**: boolean

  A thicker size of the progressbar, default: `false`.

- **[toggle]**: boolean

  Toggle the progressbar (alternate to `start`/`done`), . default `false`.

<a name="automagic"/>

## Automagic loading bar

If you only need a progress bar for multiple requests, there is a simple _plug and play_ module. It does the trick.

### For HttpModule

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

### For HttpClientModule

```ts
import { HttpClientModule } from '@angular/common/http';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpClientModule } from '@ngx-progressbar/http-client';

@NgModule({
  imports: [
    // ...
    HttpClientModule,
    NgProgressModule.forRoot(),
    NgProgressHttpClientModule
  ]
})
```

### For Lazy Routes

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

And just put the component in the template

```html
 <ng-progress></ng-progress>
```

 The progress will start and complete automatically with your HTTP requests. no need to use `NgProgress` service to call start()/done() manually.


<a name="misc"/>

## Misc

You can integrate any progress bar or spinner by subscribing to `NgProgress.state`,  for example let's use Material progress bar

```ts
import { Component } from '@angular/core';
import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app',
  template: `
    <div *ngIf="progress.state | async; let state">
      <mat-progress-bar *ngIf="state.active" mode="determinate" [value]="state.value"></mat-progress-bar>
    </div>
  `,
})
export class App {

  constructor(public progress: NgProgress) {
  }
}
```

Ofcourse you will not need to add the `<ng-progress>` component in this case :)

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

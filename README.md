<p align="center">
  <img height="200px" width="200px" style="text-align: center;" src="https://cdn.rawgit.com/MurhafSousli/ngx-progressbar/79d7fbba96cc528238e67aadb85eafe8653198de/assets/logo.svg">
  <h1 align="center">Angular Progressbar</h1>
</p>

A nanoscopic progress bar. Featuring realistic trickle animations to convince your users that something is happening!

___
[![npm](https://img.shields.io/badge/demo-online-ed1c46.svg)](https://murhafsousli.github.io/ngx-progressbar/)
[![npm](https://img.shields.io/npm/v/ngx-progressbar.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ngx-progressbar) 
[![Build Status](https://travis-ci.org/MurhafSousli/ngx-progressbar.svg?branch=master)](https://www.npmjs.com/package/ngx-progressbar) 
[![npm](https://img.shields.io/npm/l/express.svg?maxAge=2592000)](/LICENSE)

## Table of Contents 
 
 - [Live Demo](https://MurhafSousli.github.io/ngx-progressbar)
 - [Installation](#installation)
 - [Usage](#usage) 
 - [Automagic Usage](#automagic)
 - [Issues](#issues)    
 - [Author](#author)
 - [Credits](#credits)

<a name="installation"/>

## Installation

Install it with npm

`npm install ngx-progressbar --save`

### SystemJS

If you are using SystemJS, you should also adjust your configuration to point to the UMD bundle.

In your systemjs config file, map needs to tell the System loader where to look for `ngx-progressbar`:
```js
map: {
  'ngx-progressbar': 'node_modules/ngx-progressbar/bundles/ngx-progressbar.umd.js',
}
```
Here is a working [plunker](https://plnkr.co/edit/OEVjavH87Hk8GdAqdayK?p=preview).


<a name="usage"/>

## Usage

Import `NgProgressModule` in the root module

```javascript
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

```javascript
import { NgProgress } from 'ngx-progressbar';

@Component({
 /**  */ 
})
export class SomeComponent {
  
  constructor(public ngProgress: NgProgress) {
  }
  
  ngOnInit(){
      /** request started */
      this.ngProgress.start();
      this.http.get(url).subscribe(res){
          /** request completed */
          this.ngProgress.done();
      }
  }
}
```

## NgProgress Service:


 - `NgProgress.start()` *Shows the progress bar*

 - `NgProgress.set(n)`   *Sets a percentage n (where n is between 0-1)*

 - `NgProgress.inc(n)`   *Increments by n (where n is between 0-1)*

 - `NgProgress.done()`   *Completes the progress*
 

## NgProgress Component:

```html
<ng-progress [positionUsing]="'marginLeft'" [minimum]="0.15" [maximum]="1"
             [speed]="200" [showSpinner]="false" [direction]="'rightToLeftIncreased'"
             [color]="'red'" [trickleSpeed]="250" [thick]="false" [ease]="'linear'"
></ng-progress>
```


 - **[minimum]**: between `0.0` to `1.0`.

  Progress initial starting value, default `0.08`

 - **[maximum]**: between `0.0` to `1.0`.

  Progress maximum value, default `1.0`

 - **[ease]**: [Any easing function](http://easings.net/)

  Progress animation ease, default `linear`.

 - **[speed]**: in milliseconds.

  Transition speed,  default `300`.

 - **[trickleSpeed]**: in milliseconds. 

  Progress trickling speed, default `300`.

 - **[direction]**:  `leftToRightIncreased`, `leftToRightReduced` , `rightToLeftIncreased`, `rightToLeftReduced`.

  Progressbar direction for LTR and RTL websites, default: `leftToRightIncreased`.

 - **[positionUsing]**: `marginLeft`, `translate`, `translate3d`.

  Positioning method, default: `marginLeft`

 - **[color]**: any color format `#1eb77f`, `brown`, `rgb(30, 183, 127)`.

  Set the progressbar color, default: `#29d`

 - **[showSpinner]**: boolean 

  Display the spinner, default: `true`.

 - **[thick]**: boolean 

  A thicker size of the progressbar, default: `false`.

 - **[toggle]**: boolean

  Toggle the progressbar (alternate to `start`/`done`), . default `false`.

<a name="automagic"/>

## Automagic loading bar
 
 If you only need a progressbar for multiple requests, there is a simple _plug and play_ provider. It does the trick.

 #### For `Http`
 
 ```ts
import { BrowserXhr, HttpModule } from '@angular/http';
import { NgProgressModule, NgProgressBrowserXhr } from 'ngx-progressbar';

@NgModule({
  providers: [
    // ...
    { provide: BrowserXhr, useClass: NgProgressBrowserXhr }
  ],
  imports: [
    // ...
    HttpModule,
    NgProgressModule
  ]
})
```

 #### For `HttpClient` (Angular >= 4.3)

 ```ts
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgProgressModule, NgProgressInterceptor } from 'ngx-progressbar';

@NgModule({
  providers: [
    // ...
    { provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true }
  ],
  imports: [
    // ...
    HttpClientModule,
    NgProgressModule
  ]
})
```
And just put the component in the template

```html
 <ng-progress></ng-progress>
```

 The progress will start and complete automatically with your HTTP requests. no need to use `NgProgress` service to call start()/done() manually.

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


[![npm](https://img.shields.io/npm/v/ng2-progressbar.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ng2-progressbar) [![Build Status](https://travis-ci.org/MurhafSousli/ng2-progressbar.svg?branch=master)](https://travis-ci.org/MurhafSousli/ng2-progressbar) [![npm](https://img.shields.io/npm/dt/ng2-progressbar.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ng2-progressbar)

<p align="center">
  <img height="300px" width="300px" style="text-align: center;" src="https://cdn.rawgit.com/MurhafSousli/ng2-progressbar/79d7fbba96cc528238e67aadb85eafe8653198de/assets/logo.svg">
  <h1 align="center">Angular Progressbar</h1>
</p>

A nanoscopic progress bar. Featuring realistic trickle animations to convince your users that something is happening!

## Table of Contents 
 
 - [Live Demo](https://MurhafSousli.github.io/ng2-progressbar)
 - [Installation](#installation)
 - [Usage](#usage) 
 - [Issues](#issues)    
 - [Author](#author)
 - [Credits](#credits)
 - [License](#license) 

<a name="installation"/>
## Installation

Install it with npm

`npm install ng2-progressbar --save`

###SystemJS

If you are using SystemJS, you should also adjust your configuration to point to the UMD bundle.

In your systemjs config file, map needs to tell the System loader where to look for `ng2-progressbar`:
```js
map: {
  'ng2-progressbar': 'node_modules/ng2-progressbar/bundles/ng2-progressbar.umd.js',
}
```
Here is a working [plunker](https://plnkr.co/edit/OEVjavH87Hk8GdAqdayK?p=preview).


<a name="usage"/>
## Usage

Add `NgProgressModule` to **NgModule** `imports` array.

```javascript
import { NgProgressModule } from 'ng2-progressbar';

@NgModule({
imports: [
    NgProgressModule
  ]
})
```

In your template

```html
<ng-progress></ng-progress>
```

Add `NgProgressService` wherever you want to use the progressbar.

```javascript
import {NgProgressService} from "ng2-progressbar";

@Component({
 /**  */ 
})
constructor(private pService: NgProgressService) {
  }
  
  ngOnInit(){
      /** request started */
      this.pService.start();
      this.http.get(url).subscribe(res){
          /** request completed */
          this.pService.done();
      }
  }
```

## NgProgressService options (functions):


 - `NgProgressService.start()` *Shows the progress bar*

 - `NgProgressService.set(n)`   *Sets a percentage n (where n is between 0-1)*

 - `NgProgressService.inc(n)`   *Increments by n (where n is between 0-1)*

 - `NgProgressService.done()`   *Completes the progress*
 

## NgProgressComponent options (inputs):

```html
<ng-progress [positionUsing]="'marginLeft'" [minimum]="0.15" [maximum]="1"
             [speed]="'200'" [showSpinner]="'false'" [direction]="'rightToLeftIncreased'"
             [color]="'red'" [trickleSpeed]="250" [thick]="false" [ease]="'linear'"
></ng-progress>
```


 - **[minimum]**: between `0.0` to `1.0`.

  Progress initial starting value, default `0.08`

 - **[maximum]**: between `0.0` to `1.0`.

  Progress initial starting value, default `0.08`

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


### Automagic loading bar (BETA)
 
 If you only need a progressbar for multiple (XHR) requests, there is a simple _plug and play_ provider. It does the trick.
 
 ```ts
 import { NgProgressCustomBrowserXhr } from 'ng2-progressbar';
 
 @NgModule({
   
   providers: [
     { provide: BrowserXhr, useClass: NgProgressCustomBrowserXhr } ,
   ],
 })
 ```
 ```html
 <ng-progress></ng-progress>
 ```
 The progress will start and complete automatically with your HTTP requests. no need to use `NgProgressService` to call start()/done() manually.

 

<a name="issues"/>
## Issues

If you identify any errors in the library, or have an idea for an improvement, please open an [issue](https://github.com/MurhafSousli/ng2-progressbar/issues). I am excited to see what the community thinks of this project, and I would love your input!

<a name="author"/>
## Author

 **[Murhaf Sousli](http://murhafsousli.com)**

 - [github/murhafsousli](https://github.com/MurhafSousli)
 - [twitter/murhafsousli](https://twitter.com/MurhafSousli)
 
<a name="credit"/>
## Credits 

 Inspired by [NProgress.js by Rico Sta. Cruz.](https://github.com/rstacruz/nprogress)

<a name="license"/>
## License

[![npm](https://img.shields.io/npm/l/express.svg?maxAge=2592000)](/LICENSE)



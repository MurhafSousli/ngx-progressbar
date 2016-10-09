
# Angular 2 Progressbar [![npm](https://img.shields.io/npm/v/ng2-progressbar.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ng2-progressbar) [![Build Status](https://travis-ci.org/MurhafSousli/ng2-progressbar.svg?branch=master)](https://travis-ci.org/MurhafSousli/ng2-progressbar) [![npm](https://img.shields.io/npm/dt/ng2-progressbar.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ng2-progressbar)


<p align="center"><img style="text-align: center;" src="/assets/cover.png?raw=true"></p>


A nanoscopic progress bar. Featuring realistic trickle animations to convince your users that something is happening!

## Table of Contents
 
 - [Live Demo](https://github.com/MurhafSousli/ng2-progressbar)
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

 - `NgProgressService.set(n);`   *Sets a percentage 30%*

 - `NgProgressService.inc(n);`   *Increments by 20%*

 - `NgProgressService.done();`   *Completes the progress*
 
 - `NgProgressService.colors = [color1, color2, color3, ...]`   *if presented, animates the progress color with colors array*

 - `NgProgressService.colorsInterval = 500`   *progressbar colors transition speed in ms*
 

## NgProgressComponent options (inputs):

```html
<ng-progress [positionUsing]="'marginLeft'" [minimum]="0.15" [ease]="'linear'"
            [speed]="'200'" [showSpinner]="'false'" [direction]="'rightToLeftIncreased'"
             [color]="'red'" [trickle]="true" [trickleSpeed]="250"
></ng-progress>
```


 - **[minimum]**: between `0.0` to `1.0`.

  Progress initial starting value, default `0.08`

 - **[ease]**: [Any easing function](http://easings.net/)

  Progress animation ease, default `linear`.

 - **[speed]**: in milliseconds.

  Transition speed,  default `300`.

 - **[trickle]**: boolean

  Auto trickle the progressbar, default `true`

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

 - **[toggle]**: boolean

  Toggle the progressbar (alternate to `start`/`done`), . default `false`.

<a name="issues"/>
## Issues

If you identify any errors in the library, or have an idea for an improvement, please open an [issue](https://github.com/MurhafSousli/ng2-wp-api/issues). I am excited to see what the community thinks of this project, and I would love your input!

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



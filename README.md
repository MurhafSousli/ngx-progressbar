<p align="center"><img style="text-align: center;" src="/assets/ng2-progressbar.png?raw=true"></p>

# Angular 2 Progressbar [![npm](https://img.shields.io/npm/v/ng2-progressbar.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ng2-progressbar) [![Build Status](https://travis-ci.org/MurhafSousli/ng2-progressbar.svg?branch=master)](https://travis-ci.org/MurhafSousli/ng2-progressbar) [![npm](https://img.shields.io/npm/dt/ng2-progressbar.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ng2-progressbar)


A nanoscopic progress bar. Featuring realistic trickle animations to convince your users that something is happening!

## Table of Contents
 
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

in your template

```html
<ng-progress></ng-progress>
```

Add `NgProgressService` wherever you want to use the progressbar.

Usage example:

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
<ng-progress [positionUsing]="" [minimum]="0.15" [ease]="'linear'"
            [speed]="'200'" [showSpinner]="'false'" [direction]="'rightToLeftIncreased'"
             [color]="'red'" [trickle]="true" [trickleSpeed]="250"
></ng-progress>
```

#### Progress initial starting value

minimum: between `0.0` to `1.0`, default `0.08`

#### Progress animation ease

ease: default `linear`

#### Transition speed

speed: in milliseconds. default `300`

#### Auto trickle the progressbar

trickle: default `true`

#### Progress incrementing speed

trickleSpeed: in milliseconds. default `300`

#### Progressbar direction for LTR and RTL websites:

direction:  `leftToRightIncreased`, `leftToRightReduced` , `rightToLeftIncreased`, `rightToLeftReduced`. default: `leftToRightIncreased`

#### Positioning method:

positionUsing: `marginLeft`, `translate`, `translate3d` default: `marginLeft`

#### Set the progressbar color:

color: any color format `#1eb77f`, `brown`, `rgb(30, 183, 127)`, default: `#29d`

#### Display spinner:

showSpinner: show spinner default: `true`

#### Toggle the progressbar start/done (Optional):

toggle: you can bind toggle to a value to start/done (leave it if you are using the NgProgressService). default `false`




## Misc


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



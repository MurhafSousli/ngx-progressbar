<p align="center">
  <img height="200px" width="200px" style="text-align: center;" src="https://raw.githubusercontent.com/arturovt/ngx-progressbar-next/master/projects/ngx-progressbar-next-demo/src/assets/logo.svg">
  <h1 align="center">Angular Progressbar</h1>
</p>

[![npm](https://img.shields.io/npm/v/ngx-progressbar-next.svg)](https://www.npmjs.com/package/ngx-progressbar-next)
[![CI Build](https://github.com/arturovt/ngx-progressbar-next/actions/workflows/integrate.yml/badge.svg)](https://github.com/arturovt/ngx-progressbar-next/actions/workflows/integrate.yml)
[![codecov](https://codecov.io/gh/arturovt/ngx-progressbar-next/graph/badge.svg)](https://codecov.io/gh/arturovt/ngx-progressbar-next)
[![npm](https://img.shields.io/npm/dm/ngx-progressbar-next.svg)](https://www.npmjs.com/package/ngx-progressbar-next)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/ngx-progressbar-next.svg)](https://bundlephobia.com/result?p=ngx-progressbar-next)
[![license](https://img.shields.io/npm/l/ngx-progressbar-next.svg)](https://github.com/arturovt/ngx-progressbar-next/blob/master/LICENSE)

A nanoscopic progress bar. Featuring realistic trickle animations to convince your users that something is happening!

___

## About this package

This is a fork of [MurhafSousli/ngx-progressbar](https://github.com/MurhafSousli/ngx-progressbar),
published as `ngx-progressbar-next`. The original package is no longer updated.

The major version follows the Angular major version. Version 22 supports Angular 22.

___

## Installation

```bash
npm install ngx-progressbar-next
```

## Migrating from ngx-progressbar

The API is unchanged. Only the import paths change:

```diff
- import { NgProgressbar } from 'ngx-progressbar';
- import { progressInterceptor } from 'ngx-progressbar/http';
- import { NgProgressRouter } from 'ngx-progressbar/router';
+ import { NgProgressbar } from 'ngx-progressbar-next';
+ import { progressInterceptor } from 'ngx-progressbar-next/http';
+ import { NgProgressRouter } from 'ngx-progressbar-next/router';
```

___

## Documentations

### Table of contents

* [Usage](projects/ngx-progressbar-next/docs/Usage.md)
* [Styling](projects/ngx-progressbar-next/docs/Styling.md)
* [Global Options](projects/ngx-progressbar-next/docs/Global-options.md)
* [Smooth Scroll Functions](projects/ngx-progressbar-next/docs/Integration.md)
* Automagic features
  * [HttpClient Requests](projects/ngx-progressbar-next/docs/HttpClient-requests.md)
  * [Router Events](projects/ngx-progressbar-next/docs/Router-events.md)

___

## Issues

If you identify any errors in the library, or have an idea for an improvement, please open an [issue](https://github.com/arturovt/ngx-progressbar-next/issues).

## Credits

Original author: **Murhaf Sousli**, [github/murhafsousli](https://github.com/MurhafSousli).

This fork is maintained by **arturovt**, [github/arturovt](https://github.com/arturovt).

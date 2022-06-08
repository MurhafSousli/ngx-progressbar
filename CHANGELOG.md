# Changelog

## 9.0.0

- Update to Angular 14 in [d7e70a9](https://github.com/MurhafSousli/ngx-progressbar/pull/341/commits/d7e70a9965e94d47e133b0ab5490142bb80df943).

## 8.0.0

- feat: Add matcher feature to http module, closes [#254](https://github.com/MurhafSousli/ngx-progressbar/issues/254) in [a6ab70b](https://github.com/MurhafSousli/ngx-progressbar/pull/331/commits/a6ab70b3c2c9f15c2c0e71c45a88e9745f61202c) and [ce3c0d6](https://github.com/MurhafSousli/ngx-progressbar/pull/331/commits/ce3c0d6b86632c873689330cddea6a977aecf07a).
- fix: Remove case-sensitive from `silentApis`, closes [#283](https://github.com/MurhafSousli/ngx-progressbar/issues/283) in [32da22c](https://github.com/MurhafSousli/ngx-progressbar/pull/331/commits/32da22c85e9d9ea8897f7cfb6f11ef1c69226a1a).
- refactor: Change `zoom` to `transform: scale`, closes [#275](https://github.com/MurhafSousli/ngx-progressbar/issues/275) in [c78dff6](https://github.com/MurhafSousli/ngx-progressbar/pull/331/commits/c78dff66506aaedf41cd6d82e52944bbafa5748c).
- Added unit tests

### Breaking changes

**Before:**

- `silentApis` used to check the url using `url.startsWith()`

**After:**

- `silentApis` checks the url using `url.includes()`

When `silentApis` is used along with `matcher` regex, it will check if the URL matches both cases, learn more at [wiki page](https://github.com/MurhafSousli/ngx-progressbar/wiki/HttpClient-requests).


## 7.0.0

- Upgrade to Angular 13, closes [#319](https://github.com/MurhafSousli/ngx-progressbar/issues/319) in [fdf89a2](https://github.com/MurhafSousli/ngx-progressbar/pull/325/commits/fdf89a216f3b137e00b6f6f303840f32ad9f30e8).
- Rename dir attribute to direction, closes [#322](https://github.com/MurhafSousli/ngx-progressbar/issues/322) in [45634a2](https://github.com/MurhafSousli/ngx-progressbar/pull/325/commits/45634a20dae08df7b57b2f5f5a54ca09d2302e30).

## 6.1.1

- Upgrade to Angular 12

## 6.1.0

- feat: Use the strict mode, in [25f0976](https://github.com/MurhafSousli/ngx-progressbar/pull/294/commits/25f09769a4ae2a5be0945fdbbe7f0a252ce18bd6).
- fix typo for config stream in `NgProgressRef` 

### Breaking changes

- Rename `NgProgressRef.getState` to `NgProgressRef.snapshot`

## 6.0.4

- Upgrade to Angular 11

## 6.0.3

- fix: get a new progressRef after the current one has been destroyed, in [69af8fe](https://github.com/MurhafSousli/ngx-progressbar/pull/278/commits/69af8feaac600c0a3c38e116364e9f56bcd81c16).

## 6.0.2

- feat: Upgrade library to Angular 9 in [8b1929a](https://github.com/MurhafSousli/ngx-progressbar/pull/273/commits/8b1929abe3d091b96e12bc545ac83e01022761cc).
- fix: Remove warning when the package is installed in Angular 9 in [bdfd1b7](https://github.com/MurhafSousli/ngx-progressbar/pull/271/commits/bdfd1b7844412a50a9aa4c288a38f21d326c07ad).

## 6.0.1

- fix: Cancel any finalizing delays if the progress started again too soon before it was fully completed, closes [#253](https://github.com/MurhafSousli/ngx-progressbar/issues/253) in [e68c7af](https://github.com/MurhafSousli/ngx-progressbar/commit/e68c7af9bf4570a0f4645a65f2bb08ba6ea1bdb2).

## 6.0.0

### Breaking changes

#### Before

Before version 6, there were 3 packages each one published in its own npm package

`npm i @ngx-progressbar/core @ngx-progressbar/http @ngx-progressbar/router`

```ts
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { NgProgressRouterModule } from '@ngx-progressbar/router';
```

#### After

After version 6, all the packages is combined and published in one npm package

`npm i ngx-progressbar`

```ts
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { NgProgressRouterModule } from 'ngx-progressbar/router';
```


## 5.3.2

- fix(test): avoid destroying progressRef which is not yet initialized, closes [#217](https://github.com/MurhafSousli/ngx-progressbar/issues/217) in [850c65f](/MurhafSousli/ngx-progressbar/pull/246/commits/850c65f1f2681225ed091ba770dfdb65d92d382c)

## 5.3.1

- feat(http): Ignore HTTP request by appending `ignoreProgressBar` to request's headers, closes [#234](https://github.com/MurhafSousli/ngx-progressbar/issues/234) in [a625d01](https://github.com/MurhafSousli/ngx-progressbar/pull/238/commits/a625d01bfb7d3831fafb6b758512088ba93cfc24).
- enhance(core): Increase spinner speed, in [0381cd3](https://github.com/MurhafSousli/ngx-progressbar/pull/239/commits/0381cd3fa1901902feaa7ef6f02576db2d34cd6e).
- refactor(core, http, router): Deprecate `forRoot(config?)` usage, config can be provided using `withConfig(config)` instead, in [1b76e0b](https://github.com/MurhafSousli/ngx-progressbar/pull/239/commits/1b76e0bfb7381bb82e6d1bd18dea1bf73c7dcf10).

 > This removes the need to import `NgProgressModule` in your root module, in other word, you no longer need to include this library in the main bundle if you are using it in lazy loaded modules.

### Breaking changes

- Change `NgProgressModule.forRoot()` to `NgProgressModule`
- If you use custom config `NgProgressModule.forRoot(config)`, then change it to `NgProgressModule.withConfig(config)`

 > The same applies on `NgProgressHttpModule` and `NgProgressRouterModule`

## 5.2.1

- Update packages peerDependecies to remove npm warnings in Angular 7
- Update project to Angular 7

## 5.2.0

- feat(core): Add `[fixed]` option, to disable the default progress bar fixed position, closes [#212](https://github.com/MurhafSousli/ngx-progressbar/issues/212) in [fff21f3](https://github.com/MurhafSousli/ngx-progressbar/pull/214/commits/fff21f3ffda3d6d515928236a33d5fec1dd549a3).
- feat(router): Add `startEvents` and `completeEvents` options, closes [#211](https://github.com/MurhafSousli/ngx-progressbar/issues/211) in [0f7effe](https://github.com/MurhafSousli/ngx-progressbar/pull/214/commits/0f7effe0f607e583421a078d3a2a56ce9e0209fa).
- refactor(core): Refactor progressbar destroyer function.
- refactor(core): change progressbar state from `NgProgressRef.state$` to `NgProgressRef.state`.
- refactor(core): Use `Map<string, NgProgressRef>` for instances instead of just an object.
- refactor(core): Remove helper functions exposed in `NgProgress`.

### Breaking Changes

- The following functions has been remove from `NgProgress` service: `setConfig()`, `start()`, `set()`, `inc()`, `complete()`, `isStarted()`, `started()`, `completed()`, `destroy()`.

**Before:**

It was possible to use these functions from `NgProgress` service directly

```ts
ngProgress.start();
```

**After:**

These functions are accessed by the `NgProgressRef` instance

```ts
const progressRef: NgProgressRef = ngProgress.ref();
progressRef.start();
```

- If you are using `NgProgressRef` to integrate it with other progress bar components

**Before:**

```xml
<ng-container *ngIf="progressRef.state$ | async; let state">
  <mat-progress-bar *ngIf="state.active" [value]="state.value"></mat-progress-bar>
</ng-container>
```

**After:**

```xml
<ng-container *ngIf="progressRef.state | async; let state">
  <mat-progress-bar *ngIf="state.active" [value]="state.value"></mat-progress-bar>
</ng-container>
```

## 5.1.2

- fix(router): Progressbar is not completing when navigation ends, closes [#202](https://github.com/MurhafSousli/ngx-progressbar/issues/202) in [6d8b644](https://github.com/MurhafSousli/ngx-progressbar/pull/203/commits/6d8b644e6d8fe873aad20bb0b92e6e52e262c088).
- fix(router): Fix router config.delay is undefined error, in [9dae94b](https://github.com/MurhafSousli/ngx-progressbar/pull/207/commits/9dae94bfa21644495c2e6af76d85b356b178b898).

## 5.1.0

- feat(http): Add optional config to set progressRef id and silent APIs, closes [#83](https://github.com/MurhafSousli/ngx-progressbar/issues/83) in [3c1d72c](https://github.com/MurhafSousli/ngx-progressbar/pull/178/commits/3c1d72c9e203f9b299f7dda2b2eefd0ce66a78c6) (Thanks to @bboyz269).
- feat(router): Add optional config to set progressRef id and a delay to complete the progress bar, closes [#181](https://github.com/MurhafSousli/ngx-progressbar/issues/181) in [d274745](https://github.com/MurhafSousli/ngx-progressbar/pull/201/commits/d274745a9721f91f92c42987263b632d817b6bb9).
- refactor(NgProgress): Use, `{providedIn: 'root'}` instead of `useFactory` function in [d31cacd](https://github.com/MurhafSousli/ngx-progressbar/pull/201/commits/d31cacd62d9731c1caddd898f83bb1b28c9704b7).

### Breaking changes

Before, to add the automagic features, we used to import `NgProgressHttpModule` and `NgProgressRouterModule`.

Now we must use `forRoot()` on these modules => `NgProgressHttpModule.forRoot()` and `NgProgressRouterModule.forRoot()`.

## 5.0.1

- fix(build): fix `warning " > @ngx-progressbar/core@5.0.0" has incorrect peer dependency "@angular/core@5.0.0".`

## 5.0.0

- fixbug(build): fix build aot failure with angular 6, closes [#143](https://github.com/MurhafSousli/ngx-progressbar/issues/143), [#167](https://github.com/MurhafSousli/ngx-progressbar/issues/167), [#166](https://github.com/MurhafSousli/ngx-progressbar/issues/166), [#165](https://github.com/MurhafSousli/ngx-progressbar/issues/165), [#164](https://github.com/MurhafSousli/ngx-progressbar/issues/164), [#163](https://github.com/MurhafSousli/ngx-progressbar/issues/163), [#162](https://github.com/MurhafSousli/ngx-progressbar/issues/162), [#161](https://github.com/MurhafSousli/ngx-progressbar/issues/161), [#160](https://github.com/MurhafSousli/ngx-progressbar/issues/160)

## 5.0.0-rc.1

- fix(NgProgressService): NgProgress.completed: return completed observable, [#157](https://github.com/MurhafSousli/ngx-progressbar/pull/157)

## 5.0.0-rc.0

- Upgrade to Angular 6, closes [#143](https://github.com/MurhafSousli/ngx-progressbar/issues/143) in [#156](https://github.com/MurhafSousli/ngx-progressbar/pull/156).

## 4.3.0

- feat(core): add debounceTime option, closes [#141](https://github.com/MurhafSousli/ngx-progressbar/issues/141) in [#151](https://github.com/MurhafSousli/ngx-progressbar/pull/151)

## 4.2.0

- feat(core): Add `trickleFunc` input. This allows users to change the trickling amount based on progress state, closes [#146](https://github.com/MurhafSousli/ngx-progressbar/issues/146) in [#148](https://github.com/MurhafSousli/ngx-progressbar/pull/148).

## 4.1.1

- Use rxjs deep imports to avoid the whole lib to be bundled, [#132](https://github.com/MurhafSousli/ngx-progressbar/pull/132).

## 4.1.0

- feat(Support IE11): Remove css variable, closes [#123](https://github.com/MurhafSousli/ngx-progressbar/issues/123).
- refactor(NgProgressComponent): prefix component classes with `ng-` to avoid the side effects with other libraries, closes [#125](https://github.com/MurhafSousli/ngx-progressbar/issues/125).

## 4.0.1

- fix(NgProgressComponent): Initialize progress bar without inputs, closes [#118](https://github.com/MurhafSousli/ngx-progressbar/issues/118).
- refactor(NgProgressComponent): Use `style.transform` instead of `ngStyle` to animate the progress.

## 4.0.0

- Move **NgProgress** logic to **NgProgressRef**.
- Refactor(NgProgress): became a central service to access progress bars instances (NgProgressRef).
- Refactor(NgProgressRef): shorten code, reduce complexity.
- Refactor(NgProgressBarComponent): Initialize inputs from the global config.
- Improve performance: Use a pure css solution for the progress bar.
- Refactor(NgProgressModule): Remove the service factory.

### Features

- Supports multiple progress bars, closes [#113](https://github.com/MurhafSousli/ngx-progressbar/issues/113).

```html
<ng-progress></ng-progress>
<ng-progress id="instance1"></ng-progress>
<ng-progress id="instance2"></ng-progress>
```

- Ability to set global config for all progress bars using `forRoot(config)`.
- Ability to set *background-color* of the progress bar holder using `.bar-placeholder` class.
- Adds `(started)` and `(complete)` output to the component.
- Adds `start()`, `set(n)`, `inc(n)`, `complete()` methods to the component.

For example:

```html
<ng-progress #progressBar></ng-progress>
<button (click)="progressBar.start()">Start</button>
<button (click)="progressBar.complete()">Complete</button>
```

### Breaking Changes

- `@ngx-progressbar/http-client` package is deprecated in version 4.x, use `@ngx-progressbar/http` instead.
- `[toggle]` input has been removed from the component.
- `NgProgress.done()` has been renamed to `NgProgress.complete()`.
- `NgProgress.ended` has been renamed to `NgProgress.completed()`.
- Since `HttpModule` is deprecated, **NgProgress** no longer supports it.
- `NgProgressHttpClientModule` has been renamed to `NgProgressHttpModule`, so now the `HttpClient` automagic feature is published on `@ngx-progressbar/http`

## 3.0.2

- Refactor(ProgressBar)
- track multiple concurrent requests in [#105](https://github.com/MurhafSousli/ngx-progressbar/pull/105)

## 3.0.1

- Fixed the problem with AOT build in v3.0.0

## 3.0.0

### Breaking Changes

- Main package is now `@ngx-progressbar/core`

- Auto-magic features will be used by importing its module:
  - For Http requests, use `@ngx-progressbar/http`
  - For HttpClient requests, use `@ngx-progressbar/http-client`
  - For Router events, use `@ngx-progressbar/router`

- remove `[positionUsing]` option to use translate3d only
- rename `[showSpinner]` option to `[spinner]`

### Features

- Improve rendering performance
- Add `[spinnerPosition]` options to set the spinner position, `left` | `right`
- Add `progress.started()` event
- Add `progress.ended()` event
- Add option to disable progressbar tail (meteor)
- Fix progressbar tail (meteor) in right to left direction

## 2.1.1

- Allow `<ng-progress>` component to be destroyed, fixes [#27](https://github.com/MurhafSousli/ngx-progressbar/issues/27), [#28](https://github.com/MurhafSousli/ngx-progressbar/issues/28), [#33](https://github.com/MurhafSousli/ngx-progressbar/issues/33), [#41](https://github.com/MurhafSousli/ngx-progressbar/issues/41), [#81](https://github.com/MurhafSousli/ngx-progressbar/issues/81), [#82](https://github.com/MurhafSousli/ngx-progressbar/issues/82) in [#86](https://github.com/MurhafSousli/ngx-progressbar/issues/86)
- Add `NgProgressState` interface for Progress state
- **Breaking Changes**: `NgProgressService` has been renamed to `NgProgress`

## 2.1.0

### Broken Release

## 2.0.8

- fix: remove unused code in [#68](https://github.com/MurhafSousli/ngx-progressbar/issues/68)

## 2.0.7

- fix: after `progress.done()` call `progress.start()` immediately will not work, closes [#65](https://github.com/MurhafSousli/ngx-progressbar/issues/65), [#66](https://github.com/MurhafSousli/ngx-progressbar/issues/66) in [#67](https://github.com/MurhafSousli/ngx-progressbar/issues/67). Thanks to @xinshangshangxin

## 2.0.6

- Remove **NgProgressBrowserXhr** from **NgProgressModule** providers

## 2.0.5

- Remove Http peerDepenedcy, closes [#61](https://github.com/MurhafSousli/ngx-progressbar/issues/61)

## 2.0.4

- feat(NgProgressInterceptor): Adds automagic feature to `HttpClient` (Angular >= 4.3)

## 2.0.3

- Refactor(ProgressComponent) Increase `z-index`, closes #37
- General refactor for all files, improve linting
- Use inline styles and templates
- `NgProgressCustomBrowserXhr` has renamed to `NgProgressBrowserXhr`

## ~~2.0.2~~

- Broken release

## 2.0.0

- Rename npm package to `ngx-progressbar`.
- Update peerDependecies.

## 1.3.0

- (fix) Progressbar transition animation (which was introduced in v1.2.0), closes [#16](https://github.com/MurhafSousli/ngx-progressbar/issues/16)
- (refactor) ProgressBarComponent
- (feat) Support systemjs
- (feat) XHR provider for multiple http requests (BETA), closes [#15](https://github.com/MurhafSousli/ngx-progressbar/issues/15)

## 1.2.0

- (fix) Progressbar stuck after one time, closes [#10](https://github.com/MurhafSousli/ngx-progressbar/issues/10)
- (fix) AOT failing, cloese [#8](https://github.com/MurhafSousli/ngx-progressbar/issues/8)
- (feat) adds maximum input, closes [#9](https://github.com/MurhafSousli/ngx-progressbar/issues/9)

## 1.1.6

- (fix) default input values

## 1.1.4

### Fixes Bugs

- margin positioning

## 1.1.2

- fixes: Service.Done() doesn't complete the progress if it wasn't trickling 
- (fix) No Animation on IE, Edge by using css animation-js polyfills

## 1.1.1

- Use rxjs operators to imrpove code quality
- Remove extra unnecessory subjects which been used in previous versions
- Remove unnecessory style
- Use single subject for update progress state
- Move logic to the service and make components as dump as possible 
- Improve animation
- Support AOT

### Breaking Changes

- Coloring animation is deprecated 
- `[trickle]` input is deprecated 

## 1.0.3

- **Improvement:** Uses `OnPush` change detection strategy on the outer component to improve performance.

## 1.0.1

Stable release

 -**New Feature:** Thicker size using the input `[thick]=true`.
 -**Fixes Bug:** Adds transition for the spinner and the progress bar tail

***

## 0.1.5

Initial release

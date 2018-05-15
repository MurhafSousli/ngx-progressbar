# Changelog

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

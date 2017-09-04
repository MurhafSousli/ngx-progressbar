# Changelog

## 2.0.8

 - fix: remove unused code in [#68](https://github.com/MurhafSousli/ngx-progressbar/issues/68)

## 2.0.7

 - fix: after `progress.done() ` call `progress.start()` immediately will not work, closes [#65](https://github.com/MurhafSousli/ngx-progressbar/issues/65), [#66](https://github.com/MurhafSousli/ngx-progressbar/issues/66) in [#67](https://github.com/MurhafSousli/ngx-progressbar/issues/67). Thanks to @xinshangshangxin

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

* **Fixes Bugs:** 
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

 **Breaking Changes:**
 
 - Coloring animation is deprecated 
 - `[trickle]` input is deprecated 

## 1.0.3

* **Improvement:** Uses `OnPush` change detection strategy on the outer component to improve performance.

## 1.0.1

Stable release

* **New Feature:** Thicker size using the input `[thick]=true`.

* **Fixes Bug:** Adds transition for the spinner and the progress bar tail

*** 

## 0.1.5

Initial release

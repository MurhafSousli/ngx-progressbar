import resolve from 'rollup-plugin-node-resolve';

// Add here external dependencies that actually you use.
const globals = {
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@angular/http': 'ng.http',
    'rxjs/Observable': 'Rx',
    'rxjs/Subject': 'Rx',
    'rxjs/add/observable/timer': 'Rx.Observable',
    'rxjs/add/operator/do': 'Rx.Observable.prototype',
    'rxjs/add/operator/takeWhile': 'Rx.Observable.prototype',
    'rxjs/add/operator/switchMap': 'Rx.Observable.prototype',
    'rxjs/add/operator/finally': 'Rx.Observable.prototype'
};

export default {
    entry: './dist/modules/ngx-progressbar.es5.js',
    dest: './dist/bundles/ngx-progressbar.umd.js',
    format: 'umd',
    exports: 'named',
    moduleName: 'ng.ngxProgressbar',
    plugins: [resolve()],
    external: Object.keys(globals),
    globals: globals,
    onwarn: () => { return }
}
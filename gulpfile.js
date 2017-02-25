/**
 * @Author: @MurhafSousli
 */

const gulp = require('gulp');

/** To log like console.log().. */
const gutil = require('gulp-util');

/** del to remove dist directory */
const del = require('del');

/** load templates and styles in ng2 components */
const embedTemplates = require('gulp-inline-ng2-template');

/** TSLint checker */
const tslint = require('gulp-tslint');

/** Sass style */
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const scss = require('postcss-scss');
const stripInlineComments = require('postcss-strip-inline-comments');

/** External command runner */
const exec = require('child_process').exec;
const spawn = require('child_process').spawn;
const process = require('process');

/**OS Access */
const os = require('os');

/** File Access */
const fs = require('fs');
const file = require('gulp-file');
const path = require('path');

/** To properly handle pipes on error */
const pump = require('pump');

/** To upload code coverage to coveralls */
const coveralls = require('gulp-coveralls');

/** To order tasks */
const runSequence = require('run-sequence');

/** To bundle the library with Rollup */
const gulpRollup = require('gulp-better-rollup');
const rollupNodeResolve = require('rollup-plugin-node-resolve');
const rollupUglify = require('rollup-plugin-uglify');


const LIBRARY_NAME = 'ng2-progressbar';

const config = {
    allTs: 'src/**/!(*.spec).ts',
    allSass: 'src/**/*.scss',
    allHtml: 'src/**/*.html',
    demoDir: 'demo/',
    outputDir: 'dist/',
    coverageDir: 'coverage/'
};


//Helper functions
function platformPath(path) {
    return /^win/.test(os.platform()) ? `${path}.cmd` : path;
}

function startKarmaServer(isTddMode, hasCoverage, done) {
    const karmaServer = require('karma').Server;
    const travis = process.env.TRAVIS;

    let config = { configFile: `${__dirname}/karma.conf.js`, singleRun: !isTddMode, autoWatch: isTddMode };

    if (travis) {
        config['browsers'] = ['Chrome_travis_ci']; // 'Chrome_travis_ci' is defined in "customLaunchers" section of config/karma.conf.js
    }

    config['hasCoverage'] = hasCoverage;

    new karmaServer(config, done).start();
}

function execCallback(gulpDone) {
    return (error, stdout, stderr) => {
        if (stderr) {
            gutil.log(gutil.colors.red(stderr));
        }
        if (stdout) {
            gutil.log(gutil.colors.green(stdout));
        }
        // execute callback when its done 
        if (gulpDone) {
            gulpDone();
        }
    }
}
// Clean Tasks
gulp.task('clean:dist', () => {
    return del(config.outputDir);
});

gulp.task('clean:coverage', () => {
    return del(config.coverageDir);
});

gulp.task('clean', ['clean:dist', 'clean:coverage']);


// Compile Sass to css
gulp.task('styles', (cb) => {
    /**
     * Remove comments, autoprefixer, Minifier
     */
    const processors = [
        stripInlineComments,
        autoprefixer,
        cssnano
    ];
    pump([
        gulp.src(config.allSass),
        sass().on('error', sass.logError),
        postcss(processors, { syntax: scss }),
        gulp.dest('src')
    ], cb);
});

// TsLint the source files
gulp.task('lint', (cb) => {
    pump([
        gulp.src(config.allTs),
        tslint({ formatter: "verbose" }),
        tslint.report()
    ], cb);
});

// Inline templates and styles in ng2 components
gulp.task('inline-templates', (cb) => {
    const defaults = {
        base: '/src',
        target: 'es5',
        useRelativePaths: true
    };
    pump(
        [
            gulp.src(config.allTs),
            embedTemplates(defaults),
            gulp.dest(`${config.outputDir}/inlined`)
        ],
        cb);
});

// Compile inlined TS files with Angular Compiler (ngc)
gulp.task('ngc', (cb) => {
    const executable = path.join(__dirname, platformPath('/node_modules/.bin/ngc'));
    const ngc = exec(`${executable} -p ./tsconfig-aot.json`, (err) => {
        if (err) return cb(err); // return error
        del(`${config.outputDir}/inlined`); //delete temporary *.ts files with inlined templates and styles 
        cb();
    }).stdout.on('data', (data) => console.log(data));
});

// Test tasks
gulp.task('test', (cb) => {
    const ENV = process.env.NODE_ENV = process.env.ENV = 'test';
    startKarmaServer(false, true, cb);
});

gulp.task('test:ci', ['clean'], (cb) => {
    runSequence('compile', 'test');
});

gulp.task('test:watch', (cb) => {
    const ENV = process.env.NODE_ENV = process.env.ENV = 'test';
    startKarmaServer(true, true, cb);
});

gulp.task('test:watch-no-cc', (cb) => {//no coverage (useful for debugging failing tests in browser)
    const ENV = process.env.NODE_ENV = process.env.ENV = 'test';
    startKarmaServer(true, false, cb);
});

// Prepare 'dist' folder for publication to NPM
gulp.task('package', (cb) => {
    let pkgJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
    let targetPkgJson = {};
    let fieldsToCopy = ['version', 'description', 'keywords', 'author', 'repository', 'license', 'bugs', 'homepage'];

    targetPkgJson['name'] = LIBRARY_NAME;

    //only copy needed properties from project's package json
    fieldsToCopy.forEach((field) => { targetPkgJson[field] = pkgJson[field]; });

    targetPkgJson['main'] = `bundles/ng2-progressbar.umd.js`;
    targetPkgJson['module'] = 'index.js';
    targetPkgJson['typings'] = 'index.d.ts';

    // defines project's dependencies as 'peerDependencies' for final users
    targetPkgJson.peerDependencies = {};
    Object.keys(pkgJson.dependencies).forEach((dependency) => {
        if (dependency.startsWith('@angular/')) {
            // narrow version of @angular packages to address bug with JSONP inroduced in [2.4.6, 2.4.8[ && [4.0.0-beta.6, 4.0.0-beta.8[
            // see https://github.com/angular/angular/pull/13219 and changelog
            targetPkgJson.peerDependencies[dependency] = `>=2.0.0 <2.4.6 || >=2.4.8 <4.0.0-beta.6 || >=4.0.0-beta.8`;
        }
        else {
            targetPkgJson.peerDependencies[dependency] = `^${pkgJson.dependencies[dependency]}`;

        }

    });

    // copy the needed additional files in the 'dist' folder
    pump(
        [
            gulp.src(['README.md', 'LICENSE', 'CHANGELOG.md']),
            file('package.json', JSON.stringify(targetPkgJson, null, 2)),
            gulp.dest(config.outputDir)
        ],
        cb);
});

// Bundles the library as UMD bundle using RollupJS
gulp.task('bundle', () => {
    const globals = {
        // Angular dependencies
        '@angular/core': 'ng.core',
        '@angular/common': 'ng.common',
        '@angular/http': 'ng.http',

        // Rxjs dependencies
        'rxjs/Subject': 'Rx',
        'rxjs/add/observable/timer': 'Rx.Observable',
        'rxjs/add/operator/do': 'Rx.Observable.prototype',
        'rxjs/add/operator/takeWhile': 'Rx.Observable.prototype',
        'rxjs/add/operator/switchMap': 'Rx.Observable.prototype',
        'rxjs/Observable': 'Rx'
    };

    const rollupOptions = {
        context: 'this',
        external: Object.keys(globals),
        plugins: [
            rollupNodeResolve({ module: true }),
            rollupUglify()
        ]
    };

    const rollupGenerateOptions = {
        // Keep the moduleId empty because we don't want to force developers to a specific moduleId.
        moduleId: '',
        moduleName: 'ng2Progressbar', //require for 'umd' bundling, must be a valid js identifier, see rollup/rollup/issues/584
        format: 'umd',
        globals,
        dest: 'ng2-progressbar.umd.js'
    };

    return gulp.src(`${config.outputDir}/index.js`)
        .pipe(gulpRollup(rollupOptions, rollupGenerateOptions))
        .pipe(gulp.dest(`${config.outputDir}/bundles`));
});

// Serve the demo application
gulp.task('demo', (done) => {
    const executable = path.join(__dirname, platformPath('demo/node_modules/.bin/ng'));
    const ngServe = spawn(`${executable}`, ['serve'], { cwd: `${config.demoDir}` }); // run 'ng serve' from there
    ngServe.stdout.pipe(process.stdout);
    ngServe.stderr.pipe(process.stderr);

});

// Link 'dist' folder (create a local 'ng2-progressbar' package that symlinks to it)
// This way, we can have the demo project declare a dependency on 'ng2-progressbar' (as it should)
// and, thanks to 'npm link ng2-progressbar' on demo project, be sure to always use the latest built
// version of the library ( which is in 'dist/' folder)
gulp.task('link', (done) => {
    exec('npm link', { cwd: `${config.outputDir}` }, execCallback(done)); // run 'npm link' from 'dist' folder
});

// Upload code coverage report to coveralls.io (will be triggered by Travis CI on successful build)
gulp.task('coveralls', () => {
    return gulp.src(`${config.coverageDir}/coverage.lcov`)
        .pipe(coveralls());
});

// Lint, Sass to css, Inline templates & Styles and Compile
gulp.task('compile', (cb) => {
    runSequence('lint', 'styles', 'inline-templates', 'ngc', cb);
});

// Watch changes on (*.ts, *.sass, *.html) and Compile
gulp.task('watch', () => {
    gulp.watch([config.allTs, config.allHtml, config.allSass], ['compile']);
});

// Build the 'dist' folder (without publishing it to NPM)
gulp.task('build', ['clean'], (cb) => {
    runSequence('compile', 'package', 'bundle', cb);
});

// Build and then Publish 'dist' folder to NPM
gulp.task('publish', ['build'], (done) => {
    // run npm publish terminal command to publish the 'dist' folder only
    exec(`npm publish ${config.outputDir}`, execCallback(done));
});

gulp.task('default', ['build']);
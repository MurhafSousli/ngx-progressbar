/**
 * @Author: @MurhafSousli
 */

const gulp = require('gulp');

/** To log like console.log().. */
var gutil = require('gulp-util');

/** del to remove dist directory */
const del = require('del');

/** merge2 to execute tasks in parallel*/
var merge = require('merge2');

/** load templates and styles in ng2 components */
var embedTemplates = require('gulp-inline-ng2-template');

/** Typescript compiler */
const typescript = require('gulp-typescript');

/** Javascript Minifier */
const uglify = require('gulp-uglify');

/** TSLint checker */
const tslint = require('gulp-tslint');

/** Sourcemaps */
const sourcemaps = require('gulp-sourcemaps');

/** Sass style */
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const scss = require('postcss-scss');
const stripInlineComments = require('postcss-strip-inline-comments');


const tsProject = typescript.createProject('tsconfig.json');

const config = {
    allSass: 'src/**/*.scss',
    allTs: 'src/**/*.ts',
    allTsd: 'typings/index.d.ts',
    OutputDir: 'dist/'
};

// clean dist directory
gulp.task('clean', function () {
    return del(config.OutputDir);
});

// TypeScript compile
gulp.task('compile-ts', ['clean', 'styles'], function () {

    /**
     * Embed templates and styles in ng2 components
     * Write sourcemaps
     * Compile ts
     * Minifiy compiled js
     */
    var sourceTsFile = [
        config.allTs,
        config.allTsd
    ];

    var defaults = {
        base: '/src',  
        target: 'es5', 
        useRelativePaths: true
    };

    var tsResult = gulp.src(sourceTsFile)
        .pipe(embedTemplates(defaults))
        .pipe(sourcemaps.init())
        .pipe(typescript(tsProject));

    tsResult.js.pipe(uglify())
        .pipe(gulp.dest(config.OutputDir));

    return merge([
        tsResult.dts.pipe(gulp.dest(config.OutputDir)),
        tsResult.js
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(config.OutputDir))
        ]);

});

gulp.task('ts-lint', function () {
    return gulp.src(config.allTs)
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report())
});

/** Styles Task */
gulp.task('styles', function () {
    /**
     * Remove comments, autoprefixer, Minifier
     */
    var processors = [
        stripInlineComments,    
        autoprefixer,
        cssnano
    ];
    return gulp.src(config.allSass)
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors, {syntax: scss}))
        .pipe(gulp.dest('src'));
});

gulp.task('watch', function() {
    gulp.watch([config.allTs], ['ts-lint', 'compile-ts']);
    gulp.watch([config.allSass, config.allHtml], ['styles']);
});

gulp.task('default', ['ts-lint', 'compile-ts']);
gulp.task('default', ['compile-ts']);
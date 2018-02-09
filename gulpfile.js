/**
 * Created by terrorblade on 2018/2/10.
 */
const gulp = require('gulp')
const del = require('del')
const path = require('path')
const autoprefixer = require('gulp-autoprefixer')
const htmlmin = require('gulp-htmlmin')
const sass = require('gulp-sass')
const jsonminify = require('gulp-jsonminify2')
const gutil = require('gulp-util')
const combiner = require('stream-combiner2');
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const rename = require("gulp-rename")
const minifycss = require('gulp-minify-css')
const runSequence = require('run-sequence')
const jsonlint = require("gulp-jsonlint")

var colors = gutil.colors;
const handleError = function(err) {
    console.log('\n')
    gutil.log(colors.red('Error!'))
    gutil.log('fileName: ' + colors.red(err.fileName))
    gutil.log('lineNumber: ' + colors.red(err.lineNumber))
    gutil.log('message: ' + err.message)
    gutil.log('plugin: ' + colors.yellow(err.plugin))
};

gulp.task('clean', () => {
    return del(['./dist/**'])
})

gulp.task('watch', () => {
    gulp.watch('./wishes/**/*.json', ['json']);
    gulp.watch('./wishes/base/**', ['base']);
    gulp.watch('./wishes/**/*.wxml', ['wxml']);
    gulp.watch('./wishes/**/*.wxss', ['wxss']);
    gulp.watch('./wishes/**/*.js', ['js']);
});

gulp.task('jsonLint', () => {
    var combined = combiner.obj([
        gulp.src(['./wishes/**/*.json']),
        jsonlint(),
        jsonlint.reporter(),
        jsonlint.failAfterError()
    ]);

    combined.on('error', handleError);
});

gulp.task('json', ['jsonLint'], () => {
    return gulp.src('./wishes/**/*.json')
        .pipe(gulp.dest('./dist'))
})

gulp.task('jsonPro', ['jsonLint'], () => {
    return gulp.src('./wishes/**/*.json')
        .pipe(jsonminify())
        .pipe(gulp.dest('./dist'))
})

gulp.task('assets', () => {
    return gulp.src('./wishes/base/**')
        .pipe(gulp.dest('./dist/base'))
})

gulp.task('templates', () => {
    return gulp.src('./wishes/**/*.wxml')
        .pipe(gulp.dest('./dist'))
})

gulp.task('templatesPro', () => {
    return gulp.src('./wishes/**/*.wxml')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            keepClosingSlash: true
        }))
        .pipe(gulp.dest('./dist'))
});

gulp.task('wxss', () => {
    var combined = combiner.obj([
        gulp.src(['./wishes/**/*.{wxss,sass}', '!./wishes/styles/**']),
        sass().on('error', sass.logError),
        autoprefixer([
            'iOS >= 8',
            'Android >= 4.1'
        ]),
        rename((path) => path.extname = '.wxss'),
        gulp.dest('./dist')
    ]);

    combined.on('error', handleError);
});

gulp.task('wxssPro', () => {
    var combined = combiner.obj([
        gulp.src(['./wishes/**/*.{wxss,sass}', '!./wishes/styles/**']),
        sass().on('error', sass.logError),
        autoprefixer([
            'iOS >= 8',
            'Android >= 4.1'
        ]),
        minifycss(),
        rename((path) => path.extname = '.wxss'),
        gulp.dest('./dist')
    ]);

    combined.on('error', handleError);
});

gulp.task('scripts', () => {
    return gulp.src('./wishes/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./dist'))
})

gulp.task('scriptsPro', () => {
    return gulp.src('./wishes/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify({
            compress: true,
        }))
        .pipe(gulp.dest('./dist'))
})

gulp.task('dev', ['clean'], () => {
    runSequence('json',
        'assets',
        'templates',
        // 'sass',
        'wxss',
        'scripts',
        'watch');
});

gulp.task('build', [
    'jsonPro',
    'assets',
    'templatesPro',
    'wxssPro',
    'scriptsPro'
]);

gulp.task('pro', ['clean'], () => {
    runSequence('build');
})
gulp.task('default', ['build']);
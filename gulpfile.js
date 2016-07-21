var gulp = require('gulp');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');


var coffeeSources = ['components/coffee/tagline.coffee'];
var jsSources = [
    'components/scripts/rclick.js',
    'components/scripts/pixgrid.js',
    'components/scripts/tagline.js',
    'components/scripts/template.js'
];

// simple tests for gulp tasks

/*
gulp.task('hello', function() {
    console.log('hello Yiannis');
});

gulp.task('log', function() {
    gutil.log('Workflows are awesome');
});

gulp.task('default', function() {
    return gutil.log("Gulp is running");
});
*/


// Real tasks
// =================

// coffeescript
gulp.task('coffee', function() {
    gulp.src(coffeeSources)
        .pipe(coffee({ bare: true }) //bare: true compiles javascript without putting it in a safety wrapper 
             .on('error', gutil.log))   //catch errors to avoid crach
        .pipe(gulp.dest('components/scripts'))
});

// Scripts concatenation
gulp.task('js', function() {
    gulp.src(jsSources)
        .pipe(concat('script.js'))
        .pipe(gulp.dest('builds/development/js'))
});

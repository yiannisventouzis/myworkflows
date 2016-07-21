var gulp = require('gulp');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');

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

gulp.task('coffee', function() {
    gulp.src('components/coffee/tagline.coffee')
        .pipe(coffee({ bare: true }) //bare: true compiles javascript without putting it in a safety wrapper 
             .on('error', gutil.log))   //catch errors to avoid crach
        .pipe(gulp.dest('components/scripts'))
});
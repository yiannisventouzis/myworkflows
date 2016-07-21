var gulp = require("gulp");
var gutil = require("gulp-util");

// simple test for gulp tasks

gulp.task('hello', function() {
    console.log('hello Yiannis');
});

gulp.task('log', function() {
    gutil.log("Workflows are awesome");
});
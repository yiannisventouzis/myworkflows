var gulp = require('gulp');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
var browserify = require('gulp-browserify');
var compass = require('gulp-compass');
var connect = require('gulp-connect');
var concat = require('gulp-concat');


var coffeeSources = ['components/coffee/tagline.coffee'];
var jsSources = [
    'components/scripts/rclick.js',
    'components/scripts/pixgrid.js',
    'components/scripts/tagline.js',
    'components/scripts/template.js'
];

var sassSources = ['components/sass/style.scss'];
var htmlSources = ['builds/development/*.html'];
var jsonSources = ['builds/development/js/*.json'];

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
        .pipe(browserify())
        .pipe(gulp.dest('builds/development/js'))
        .pipe(connect.reload())
});

// Convert Sass to CSS
gulp.task('compass', function() {
    gulp.src(sassSources)
        .pipe(compass({
            sass: 'components/sass',
            image: 'builds/development/images',
            style: 'expanded'
    })
            .on('error', gutil.log))
        .pipe(gulp.dest('builds/development/css'))
        .pipe(connect.reload())
});

// watch
gulp.task('watch', function(){
    gulp.watch(coffeeSources, ['coffee']);
    gulp.watch(jsSources, ['js']);
    gulp.watch('components/sass/style.scss', ['compass']);
    gulp.watch(htmlSources, ['html']);
    gulp.watch(jsonSources, ['json']);
});


// Server creation
gulp.task('connect', function() {
    connect.server({
        root: 'builds/development/',
        livereload: true
   }); 
});

// reload page when html file changes
gulp.task('html', function() {
    gulp.src(htmlSources)
        .pipe(connect.reload())
});

// track changes at JSON files
gulp.task('json', function() {
    gulp.src(jsonSources)
        .pipe(connect.reload())
});

// The default task
gulp.task('default', ['html', 'json', 'coffee', 'js', 'compass', 'connect', 'watch']);
// Plug-ins
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat');

// Declaration of variables
var env,
    coffeeSources,
    jsSources,
    sassSources,
    htmlSources,
    jsonSources,
    outputDir,
    sassStyle;
    
// variables asignment
env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    outputDir = 'builds/development/';
    sassStyle = 'expanded';
} else {
    outputDir = 'builds/production/';
    sassStyle = 'compressed';
}


coffeeSources = ['components/coffee/tagline.coffee'];

jsSources = [
    'components/scripts/rclick.js',
    'components/scripts/pixgrid.js',
    'components/scripts/tagline.js',
    'components/scripts/template.js'
];

sassSources = ['components/sass/style.scss'];
htmlSources = [outputDir + '*.html'];
jsonSources = [outputDir + 'js/*.json'];


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
        .pipe(gulp.dest(outputDir + 'js'))
        .pipe(connect.reload())
});

// Convert Sass to CSS
gulp.task('compass', function() {
    gulp.src(sassSources)
        .pipe(compass({
            sass: 'components/sass',
            image: outputDir + 'images',
            style: sassStyle
    })
            .on('error', gutil.log))
        .pipe(gulp.dest(outputDir + 'css'))
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
        root: outputDir,
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
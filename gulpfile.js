// How to install a plugin: sudo npm install gulp-* -D --unsafe-perm=true

var gulp = require('gulp'),
    gulpIf = require('gulp-if'),

    // CSS
    sass = require('gulp-sass'),
    concatCss = require('gulp-concat-css'),
    minifyCss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),

    // HTML
    minifyHtml = require('gulp-minify-html'),

    // JS
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');


/*
imageMin = require('gulp-imagemin'),
svgMin = require('gulp-svgmin');
jshint = require('gulp-jshint'),
imagemin = require('gulp-imagemin'),
clean = require('gulp-clean'),
notify = require('gulp-notify'),
cache = require('gulp-cache'),
livereload = require('gulp-livereload'),
lr = require('tiny-lr'),
server = lr();
*/

// ============================================================ MAIN FUNCTIONS

var currentTask;

gulp.task('prev', function(){
    currentTask = this.seq.slice(-1)[0];
    convertSass('app');
});

gulp.task('build', function(){
    currentTask = this.seq.slice(-1)[0];
    convertSass('dist');
    convertHtml('dist');
    convertJs('dist');
});




// ============================================================ SMALL FUNCTIONS

function convertSass(destination){
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({ browsers: ['IE 6','Chrome 9', 'Firefox 14']})) // create browserlist config file
        .pipe(concatCss('style.css'))
        .pipe(gulpIf(currentTask == 'build', minifyCss())) // just in build-task
        .pipe(gulp.dest(destination + '/css'));
}

function convertHtml(destination){
    return gulp.src('app/index.html')
        .pipe(minifyHtml())
        .pipe(gulp.dest(destination));
}

function convertJs(destination){
    return gulp.src('app/js/**/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest(destination + 'js'));
}
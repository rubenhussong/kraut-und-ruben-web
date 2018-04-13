/*      How to install a plugin:
        sudo npm install gulp-* -D --unsafe-perm=true
 */

var gulp = require('gulp'),
    gulpIf = require('gulp-if'),

    // Css
    sass = require('gulp-sass'),
    concatCss = require('gulp-concat-css'),
    minifyCss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),

    // Html
    minifyHtml = require('gulp-minify-html'),

    // Js
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),

    // Img
    imagemin = require('gulp-imagemin');


/*
imageMin = require('gulp-imagemin'),
svgMin = require('gulp-svgmin');
jshint = require('gulp-jshint'),
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
    convertImgs('dist');
});




// ============================================================ SMALL FUNCTIONS

function convertSass(destination){
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({ browsers: [ // TO DO: create automatic browser list
            'IE 6',
            'Chrome 9',
            'Firefox 14']}))
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

function convertImgs(destination){ // TO DO: add responsive image function
    return gulp.src('app/images/**/*')
        .pipe(cache(imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(destination + 'img'));
}
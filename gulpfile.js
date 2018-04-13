// How to install a plugin: sudo npm install gulp-* -D --unsafe-perm=true

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concatCss = require('gulp-concat-css'),
    minifyCss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer');




/*
minifyHtml = require('gulp-minify-html'),
imageMin = require('gulp-imagemin'),
svgMin = require('gulp-svgmin');
jshint = require('gulp-jshint'),
uglify = require('gulp-uglify'),
imagemin = require('gulp-imagemin'),
rename = require('gulp-rename'),
clean = require('gulp-clean'),
concat = require('gulp-concat'),
notify = require('gulp-notify'),
cache = require('gulp-cache'),
livereload = require('gulp-livereload'),
lr = require('tiny-lr'),
server = lr();
*/

// ============================================================ MAIN FUNCTIONS

gulp.task('prev', function(){
    convertSass('app/css');
});

gulp.task('build', function(){
    convertSass('dist/css');
});




// ============================================================ SMALL FUNCTIONS

function convertSass(destination){
   return gulp.src('app/scss/**/*.scss')
       .pipe(sass().on('error', sass.logError))
       .pipe(autoprefixer({ browsers: ['IE 6','Chrome 9', 'Firefox 14']})) // create browserlist config file
       .pipe(concatCss('style.css'))
       .pipe(minifyCss())
       .pipe(gulp.dest(destination));
}
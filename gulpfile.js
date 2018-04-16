/*      How to install a plugin:
        sudo npm install gulp-* -D --unsafe-perm=true
*/

var gulp = require('gulp'),
    gulpIf = require('gulp-if'),                        // integrate if-conditions
    watch = require('gulp-watch'),

    // CSS
    sass = require('gulp-sass'),                        // compile SASS to CSS
    concatCss = require('gulp-concat-css'),             // combine CSS-Files
    minifyCss = require('gulp-minify-css'),             // minify CSS-Code
    autoprefixer = require('gulp-autoprefixer'),        // add vendor prefixes automatically

    // HTML
    minifyHtml = require('gulp-minify-html'),           // minify HTML-Code
    replace = require('gulp-replace'),                  // replace img-tags to create img-srcsets
    dom = require('gulp-dom'),

    // JS
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),                    // combine JS-Files

    // IMG
    imagemin = require('gulp-imagemin'),                // optimize IMGs
    changed = require('gulp-changed'),                  // just convert new or changed images (don’t know difference yet)
    pngquant = require('imagemin-pngquant'),            // optimize PNGs even more
    rename = require('gulp-rename'),
    imageResize = require("gulp-image-resize"),
    changeCase = require('change-case');


/*
cache = require('gulp-cache'),
del = require("del"),
deleteEmpty = require("delete-empty"),
gulpImageresize = require("gulp-image-resize"),
svgMin = require('gulp-svgmin');
jshint = require('gulp-jshint'),
clean = require('gulp-clean'),
notify = require('gulp-notify'),
*/



const screenSize = [
    480,
    640,
    768,
    900,
    1024,
    1366,
    1600,
    1920,
    2260
];




// ============================================================ MAIN TASKS

gulp.task('build', function(){
    var destination = 'dist';

    convertSass(destination);
    convertHtml(destination);
    convertJs(destination);


    for (var i = 0; i < screenSize.length; i++) {
        console.log(screenSize[i]);
        convertImgs(destination, screenSize[i]);
    }
});

gulp.task('prev', function(){
    var destination = 'app';

    convertSass(destination);
    convertJs(destination);
});





// ============================================================ AUTOMATIC TASKS

gulp.task('watch', function() {
    gulp.watch('app/scss/**/*.{sass,scss}', ['autoConvertSass']);
    gulp.watch(['app/js/**/*.js', '!app/scss/main-min.js'], ['autoConvertJs']);
});

gulp.task('autoConvertSass', function(){
    var destination = 'app';
    convertSass(destination);
});

gulp.task('autoConvertJs', function(){
    var destination = 'app';
    convertJs(destination);
});





// ============================================================ FUNCTIONS

function convertSass(destination){
    return gulp.src('app/scss/**/*.{sass,scss}')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({ browsers: [ // TO DO: create automatic browser list
            'IE 6',
            'Chrome 9',
            'Firefox 14'
        ]}))
        .pipe(concatCss('style.css'))
        .pipe(gulpIf(destination == 'dist', minifyCss())) // just in build-task
        .pipe(gulp.dest(destination + '/css'));
}

function convertHtml(destination){
    return gulp.src('app/*.html')
        //.pipe(minifyHtml({collapseWhitespace: true}))
        .pipe(replace('test-01.png', 'test-02.png'))
        .pipe(concat('index.html'))
        .pipe(gulp.dest(destination));
}

function convertJs(destination){
    return gulp.src(['app/js/**/*.js', '!app/js/main-min.js'])
        .pipe(concat('main-min.js'))
        .pipe(gulpIf(destination == 'dist', uglify()))
        .pipe(gulp.dest(destination + '/js'));
}

function convertImgs(destination, sourceSet, imageWidth){ // TO DO: add responsive image function
    return gulp.src('app/img/**/*')
        .pipe(rename(function(path){
            path.basename = path.basename + '-' + sourceSet.toString() + 'px';
            path.extname = changeCase.lowerCase(path.extname)
        }))
        .pipe(changed(destination + '/img/' + sourceSet + 'px'))
        .pipe(imageResize({
            width : sourceSet, // TO DO: implement imageSize-coefficient
            upscale: true,
            imageMagick: true
        }))
        .pipe(imagemin({ // TO DO: check out imagemin options
            progressive: true,
            interlaced: true,
            use: [pngquant()],
            verbose: true
        }))
        .pipe(gulp.dest(destination + '/img/' + sourceSet + 'px'));
}
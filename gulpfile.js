/*      How to install a plugin:
        sudo npm install gulp-* -D --unsafe-perm=true
*/

var gulp = require('gulp'),
    gulpIf = require('gulp-if'),                        // integrate if-conditions

    // CSS
    sass = require('gulp-sass'),                        // compile SASS to CSS
    concatCss = require('gulp-concat-css'),             // combine CSS-Files
    minifyCss = require('gulp-minify-css'),             // minify CSS-Code
    autoprefixer = require('gulp-autoprefixer'),        // add vendor prefixes automatically

    // HTML
    minifyHtml = require('gulp-minify-html'),           // minify HTML-Code

    // JS
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),                    // combine JS-Files

    // IMG
    imagemin = require('gulp-imagemin'),                // optimize IMGs
    changed = require('gulp-changed'),                  // just convert new or changed images (don’t know difference yet)
    pngquant = require('imagemin-pngquant'),            // optimize PNGs even more
    rename = require('gulp-rename'),
    changeCase = require('change-case');
    //cache = require('gulp-cache'),
    //del = require("del"),
    //deleteEmpty = require("delete-empty"),
    //globby = require("globby"),
    //gulpImageresize = require("gulp-image-resize"),
    //gulpNewer = require("gulp-newer");
    //merge2 = require("merge2");


/*
svgMin = require('gulp-svgmin');
jshint = require('gulp-jshint'),
clean = require('gulp-clean'),
notify = require('gulp-notify'),
livereload = require('gulp-livereload'),
lr = require('tiny-lr'),
server = lr();
*/

// ============================================================ MAIN TASKS

var currentTask;

gulp.task('build', function(){
    currentTask = this.seq.slice(-1)[0];
    var destination = 'dist';

    convertSass(destination);
    convertHtml(destination);
    convertJs(destination);
    convertImgs(destination);
});

gulp.task('prev', function(){
    currentTask = this.seq.slice(-1)[0];
    var destination = 'app';

    convertSass(destination);
    convertJs(destination);
});


// ============================================================ AUTOMATIC TASKS

gulp.task('watch', function() {
    gulp.watch('/app/scss/**/*.{sass,scss}', [convertSass('app')]);
    gulp.watch('app/js/**/*.js', [convertJs('app')]);
})


// ============================================================ FUNCTIONS

function convertSass(destination){
    return gulp.src('app/scss/**/*.{sass,scss}')
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
        //.pipe(minifyHtml({collapseWhitespace: true}))
        .pipe(gulp.dest(destination));
}

function convertJs(destination){
    return gulp.src('app/js/**/*.js')
        .pipe(concat('main-min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(destination + '/js'));
}

function convertImgs(destination){ // TO DO: add responsive image function
    return gulp.src('app/img/**/*')
        .pipe(changed(destination + '/img'))
        .pipe(imagemin({ // TO DO: check out imagemin options
            optimizationLevel: 5,
            progressive: true,
            interlaced: true,
            use: [pngquant()],
            verbose: true
            //svgoPlugins: [{ removeViewBox: false }, { removeUselessStrokeAndFill: false }]
        }))
        .pipe(rename(function(path){
            path.extname = changeCase.lowerCase(path.extname)
        }))
        .pipe(gulp.dest(destination + '/img'));
}
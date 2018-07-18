/*      How to install a plugin:
        sudo npm install gulp-* -D --unsafe-perm=true
*/

var gulp = require('gulp'),
    gulpIf = require('gulp-if'),                        // integrate if-conditions
    watch = require('gulp-watch'),

    // CSS
    sass = require('gulp-sass'),                        // compile SASS to CSS
    concatCss = require('gulp-concat-css'),             // combine CSS-Files
    minifyCss = require('gulp-clean-css'),              // minify CSS-Code
    autoprefixer = require('gulp-autoprefixer'),        // add vendor prefixes automatically
    purgecss = require('gulp-purgecss'),                // remove unused css

    // HTML
    minifyHtml = require('gulp-minify-html'),           // minify HTML-Code
    replace = require('gulp-replace'),                  // replace img-tags to create img-srcsets
    lazySrc = require('gulp-lazysizes-srcset'),

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



const screenSize = [
    320,
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


// Watch Modules

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
    return gulp.src('app/scss/main.scss')
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
        .pipe(replace('src=', 'data-src='))
        .pipe(replace('sizes=', 'data-sizes='))
        .pipe(lazySrc({
            decodeEntities: false,
            src: 'data-src',
            srcset: 'data-srcset',
            suffix: {
                '320w': '-320px',
                '640w': '-640px',
                '768w': '-768px',
                '900w': '-900px',
                '1024w': '-1024px',
                '1366w': '-1366px',
                '1600w': '-1600px',
                '1920w': '-1920px',
                '2260w': '-2260px'
            }
        }))
        //.pipe(replace('data-src=', 'src='))
        //.pipe(replace('data-srcset=', 'srcset='))
        //.pipe(replace('data-sizes=', 'sizes='))
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
            path.extname = changeCase.lowerCase(path.extname);
        }))
        .pipe(changed(destination + '/img/'/* + sourceSet + 'px'*/))
        .pipe(imageResize({
            width : sourceSet, // TO DO: implement imageSize-coefficient (search with dom() for sizes-attribute of img-tag with alt=path.basename and make it a number)
            upscale: true,
            imageMagick: true
        }))
        .pipe(imagemin({ // TO DO: check out imagemin options
            progressive: true,
            interlaced: true,
            use: [pngquant()],
            verbose: true
        }))
        .pipe(gulp.dest(destination + '/img/'/* + sourceSet + 'px'*/));
}
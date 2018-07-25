/*      How to install a plugin:
 sudo npm install gulp-* -D --unsafe-perm=true
 */

// ================================================================================ G E N E R A L

// ======================================== Requirements

// Basic Stuff
var gulp = require('gulp');
var flatten = require('gulp-flatten');
var rename = require('gulp-rename');

// Styles
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var minifyCss = require('gulp-cssnano');

// Scripts
var uglify = require('gulp-uglify-es').default;
var optimizeJs = require('gulp-optimize-js');

// PHP
var lazysizesSrcset = require('gulp-lazysizes-srcset');

// Images
var responsive = require('gulp-responsive');
var imageResize = require('gulp-image-resize');
var imageOptim = require('gulp-imageoptim');


// ======================================== Paths
var paths = {
    input: 'app/**/*',
    output: 'dist/',
    styles: {
        input: 'app/scss/**/*.{scss,sass}',
        prev: 'app/css/',
        output: 'dist/css/'
    },
    scripts: {
        input: 'app/js/**/*.js',
        output: 'dist/js/'
    },
    php: {
        input: 'app/php/**/*.php',
        output: 'dist/php/'
    },
    media: {
        input: 'app/img/**/*',
        output: 'dist/img/'
    },
    favicon: {
        input: 'app/favicon/*',
        output: 'dist/favicon/'
    },
    fonts: {
        input: 'app/fonts/*',
        output: 'dist/fonts/'
    }
};

var imageSize = [
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

var imageSizeFallback = imageSize[4];


// ================================================================================ T A S K S

// ================================================== B U I L D

/*
build final website for upload
– destination: dist-directory
– CSS-Build (destination: css-directory)
– JS-Build (destination: js-directory)
– PHP-Build (destination: php-directory and/or root)
– Favicon-Build (destination: favicon-directory and root)
– Fonts-Build (destination: fonts-directory)
*/

gulp.task('build', [
    'css-build',
    'js-build',
    'php-build',
    'favicon-build',
    'fonts-build'
]);


// ================================================== W A T C H

/*
Compile SCSS, when file changed
– destination: app-directory
– CSS-Preview (destination: css-directory)
*/

gulp.task('watch', function() {
    gulp.watch([paths.styles.input], ['css-prev']);
});


// ================================================== C S S

/*
PREVIEW:
– compiling SCSS to CSS
– concating to on file (style.css)
– automatic vendor prefixes
*/

gulp.task('css-prev', function() {
    return gulp.src(paths.styles.input)
        .pipe(sass({
            outputStyle: 'expanded',
            sourceComments: true
        }))
        .pipe(flatten())
        .pipe(prefix({
            browsers: ['last 2 version', '> 1%'],
            cascade: true,
            remove: true
        }))
        .pipe(rename('style.css'))
        .pipe(gulp.dest(paths.styles.prev));
});


/*
BUILD:
– CSS-Preview
– move css to dist (style + normalize)
– minify both
*/

gulp.task('css-build', ['css-prev'], function() {
    return gulp.src(paths.styles.prev + '*')
        .pipe(minifyCss({
            discardComments: {
                removeAll: true
            },
            discardDuplicates: true,
            discardEmpty: true,
            minifySelectors: true
        }))
        .pipe(gulp.dest(paths.styles.output));
});


// ================================================== J S

/*
BUILD:
– optimize
– minify/uglify
*/

gulp.task('js-build', function() {
    return gulp.src(paths.scripts.input)
        .pipe(uglify())
        .pipe(optimizeJs())
        .pipe(gulp.dest(paths.scripts.output));
});

// ================================================== P H P

/*
BUILD:
– translate src to srcset
– minify
*/

gulp.task('php-index-build', function() {
    return gulp.src(paths.input + 'index.php')
        .pipe(gulp.dest(paths.output));
});



//for (var i = 0; i < imageSize.length; i++) {
//    var suffix = imageSize[i].toString() + 'w': '-' + imageSize[i].toString() + 'px';
//    imageSizeLists.push(singleList);
//}

gulp.task('php-directories-build', function() {
    var suffixes = {
        '320w': '-320px',
        '640w': '-640px',
        '768w': '-768px',
        '900w': '-900px',
        '1024w': '-1024px',
        '1366w': '-1366px',
        '1600w': '-1600px',
        '1920w': '-1920px',
        '2260w': '-2260px'
    };
    return gulp.src(paths.php.input)
        .pipe(lazysizesSrcset({
            decodeEntities: false,
            data_src: 'data-src',
            data_srcset: 'data-srcset',
            suffix: suffixes
        }))
        .pipe(gulp.dest(paths.php.output));
});

gulp.task('php-build', ['php-index-build', 'php-directories-build']);


// ================================================== I M G s

/*
BUILD:
– resize and rename (for srcset)
– optimize
– create directory
*/

gulp.task('image-build', function() {
    var imageSizeLists = [];
    for (var i = 0; i < imageSize.length; i++) {
        var singleList = {
            width: imageSize[i],
            rename: {
                suffix: '-' + imageSize[i].toString() + 'px'
            },
            quality: 70
        };
        imageSizeLists.push(singleList);
    }
    return gulp.src(paths.media.input + '.{jpg,png}')
        .pipe(responsive({
           '**/*.*': imageSizeLists
        }, {
            progressive: true,
            withMetadata: false,
            withoutEnlargement: true,
            skipOnEnlargement: true,
            errorOnEnlargement: false
        }))
        .pipe(gulp.dest(paths.media.output));
});

gulp.task('gif-build', function() {
    function gifBuild(size) {
        return gulp.src(paths.media.input + '.gif')
            .pipe(rename({
                suffix: '-' + size.toString() + 'px'
            }))
            .pipe(imageResize({
                width : size,
                upscale : false
            }))
            .pipe(gulp.dest(paths.media.output));
    }
    for (var i = 0; i < imageSize.length; i++) {
        gifBuild(imageSize[i]);
    }
});

gulp.task('image-fallback-build', function() {
    return gulp.src(paths.media.input + '.*')
        .pipe(imageResize({
            width : imageSizeFallback,
            upscale : false
        }))
        //.pipe(imageOptim.optimize())
        .pipe(gulp.dest(paths.media.output));
});


// ================================================== F A V I C O N

/*
move favicons to destination
*/


gulp.task('favicon-fallback-build', function() {
    return gulp.src(paths.input + 'favicon.ico')
        .pipe(gulp.dest(paths.output));
});

gulp.task('favicon-directory-build', function() {
    return gulp.src(paths.favicon.input)
        .pipe(gulp.dest(paths.favicon.output));
});

gulp.task('favicon-build', ['favicon-fallback-build', 'favicon-directory-build']);


// ================================================== F O N T S

/*
move fonts to destination
 */

gulp.task('fonts-build', function() {
    return gulp.src(paths.fonts.input)
        .pipe(gulp.dest(paths.fonts.output));
});
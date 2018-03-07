'use strict';


const gulp = require('gulp');
const watch = require('gulp-watch');
const prefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const rigger = require('gulp-rigger');
const cssmin = require('gulp-minify-css');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const rimraf = require('rimraf');
const browserSync = require("browser-sync");


var path = {
    build: {
        html: './build',
        js: './build/js',
        php: './build/php',
        css: './build/css',
        img: './build/img',
        fonts: './build/fonts'
    },
    src: {
        template: './source/index.html',
        js: './source/js/*.js',
        php: './source/php/form.php',
        style: './source/styles/main.sass',
        img: './source/img/**/*.*', 
        fonts: './source/fonts/**/*.*'
    },
    watch: {
        template: './source/index.html',
        js: './source/js/**/*.js',
        php: './source/php/**/*.php',
        style: './source/styles/**/*.sass',
        img: './source/img/**/*.*',
        fonts: './source/fonts/**/*.*'
    },
    clean: './build'
};


/* ------------ HTML build ------------- */
gulp.task('html:build', function buildHTML() {
    return gulp.src(path.src.template)
        .pipe(gulp.dest(path.build.html))
        .pipe(browserSync.reload({stream: true}));
});


/* ------------ js build ------------- */
gulp.task('js:build', function () {
    return gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(browserSync.reload({stream: true}));
});


/* ------------ Style build ------------- */
gulp.task('style:build', function () {
    return gulp.src([path.src.style, './source/styles/css/*.css'])
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(prefixer({ grid: true }))
        .pipe(cssmin())
        .pipe(gulp.dest(path.build.css))
        .pipe(browserSync.reload({stream: true}));
});


/* ------------ Image build ------------- */
gulp.task('image:build', function () {
    return gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(browserSync.reload({stream: true}));
});


/* ------------ Fonts build ------------- */
gulp.task('fonts:build', function() {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
        .pipe(browserSync.reload({stream: true}));
});


gulp.task('clean', function del(cb) {
    return rimraf('build', cb);
});


gulp.task('browser-sync', function(){
    browserSync.init({
        server: "./build",
        port: 8080
    });
    browserSync({server: true}, function(err, bs) {
        console.log(bs.options.getIn(["urls", "local"]));
    });
});


gulp.task('watch', function(){
    gulp.watch(path.watch.style, gulp.series('style:build'));
    gulp.watch(path.watch.template, gulp.series('html:build'));
    gulp.watch(path.watch.js, gulp.series('js:build'));
    gulp.watch(path.watch.img, gulp.series('image:build'));
    gulp.watch(path.watch.fonts, gulp.series('fonts:build'));
});

gulp.task('default', gulp.series('clean', 
        gulp.parallel('style:build', 'html:build', 'js:build', 'image:build', 'fonts:build'),
        gulp.parallel('watch', 'browser-sync')
    )
);
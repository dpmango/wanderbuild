var gulp        = require('gulp');
var plumber     = require('gulp-plumber');
var svgmin      = require('gulp-svgmin');
var config      = require('../config');

gulp.task('svg-min', function() {
  return gulp
    .src(config.src.iconsSvg + '/*.svg')
    .pipe(plumber({
        errorHandler: config.errorHandler
    }))
    .pipe(svgmin({
        js2svg: {
            pretty: true
        },
        plugins: [{
            removeDesc: true
        }, {
            cleanupIDs: true
        }, {
            mergePaths: false
        }]
    }))
    .pipe(gulp.dest(config.src.svg + '/sprite-src'));
});

gulp.task('svg-min:watch', function() {
    gulp.watch(config.src.iconsSvg + '/*.svg', ['svg-min']);
});
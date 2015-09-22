'use strict';

var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var notify = require('gulp-notify');
var path = require('path');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var size = require('gulp-size');
var sound = require('mac-sounds');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

module.exports = function (config) {

    return function () {

        return browserify({debug: true})
            .add(config.src)
            .bundle()
            .pipe(plumber({
                errorHandler: function (err) {
                    sound('blow');
                    console.log(err);
                }
            }))
            .pipe(source(path.basename(config.src)))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(config.dest))
            .pipe(notify(function () {
                sound('morse');
            }))
            .pipe(size({showFiles: true}))
            .pipe(uglify())
            .pipe(rename({suffix: ".min"}))
            .pipe(gulp.dest(config.dest))
            .pipe(size({showFiles: true}));

    };

};
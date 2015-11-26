var gulp = require('gulp'),
	concat = require('gulp-concat'),
  plumber = require('gulp-plumber'),
	compass = require('gulp-compass');

var path = {
  'source': './source/',
  'bower' : './bower_components/',
  'css': './source/stylesheets/',
  'img': './source/images/',
  'public': './public/'
}


gulp.task('jsLib', function() {
  gulp.src([
    path.bower + 'jquery/dist/jquery.min.js',
    path.bower + 'bootstrap/dist/js/bootstrap.min.js',
    ])
    .pipe(plumber())
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest( path.public + 'js'))
});

gulp.task('compass', function() {
  gulp.src(['./source/scss/'])
  .pipe(plumber())
  .pipe(compass({
    config_file: './config.rb'
  }))
});

gulp.task('compass-watch', function () {
  gulp.watch('./source/**/*.scss', ['compass']);
});

gulp.task('default', ['watch','jsLib']);



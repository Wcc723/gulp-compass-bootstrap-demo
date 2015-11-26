var gulp = require('gulp'),
	concat = require('gulp-concat'),
  plumber = require('gulp-plumber'),
	compass = require('gulp-compass'),
  watch = require('gulp-watch'),
  batch = require('gulp-batch');

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
  return gulp.src(['./source/scss/'])
  .pipe(plumber())
  .pipe(compass({
    config_file: './config.rb'
  }))
});

gulp.task('html', function() {
  gulp.src(['./source/**/**.html'])
  .pipe(plumber())
  .pipe(gulp.dest( path.public ))
});

gulp.task('watch', function () {
  watch('./source/scss/**/*.scss', batch(function (events, done) {
    gulp.start('compass', done);
  }));
  watch('./source/**/**.html', batch(function (events, done) {
    gulp.start('html', done);
  }));
});

gulp.task('default', ['watch','jsLib','compass','html']);



var gulp = require('gulp'),
	concat = require('gulp-concat'),
  plumber = require('gulp-plumber'),
	compass = require('gulp-compass'),
  watch = require('gulp-watch'),
  batch = require('gulp-batch');

// 定義路徑
var path = {
  'source': './source/',
  'bower' : './bower_components/',
  'css': './source/stylesheets/',
  'img': './source/images/',
  'public': './public/'
}

// 合併套件js
gulp.task('jsLib', function() {
  gulp.src([
    path.bower + 'jquery/dist/jquery.min.js',
    path.bower + 'bootstrap/dist/js/bootstrap.min.js',
    ])
    .pipe(plumber())
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest( path.public + 'js'))
});

// 編譯Compass
gulp.task('compass', function() {
  return gulp.src(['./source/scss/'])
  .pipe(plumber())
  .pipe(compass({
    config_file: './config.rb' // ** 注意：這裡必需額外加入config.rb **
  }))
});

// 複製 Html 到 Public 資料夾
gulp.task('html', function() {
  gulp.src(['./source/**/**.html'])
  .pipe(plumber())
  .pipe(gulp.dest( path.public ))
});

// 監聽資料夾事件
gulp.task('watch', function () {
  watch('./source/scss/**/*.scss', batch(function (events, done) {
    gulp.start('compass', done);
  }));
  watch('./source/**/**.html', batch(function (events, done) {
    gulp.start('html', done);
  }));
});

gulp.task('default', ['watch','jsLib','compass','html']);



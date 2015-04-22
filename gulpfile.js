var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var minifyCss = require('gulp-minify-css');

var imageminJpegtran = require('imagemin-jpegtran');

gulp.task('compress-js', function() {
  return gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('rename-js', function() {
	gulp.src("./dist/*.js")
	.pipe(rename(function (path) {
	path.dirname += "/";
	path.basename += ".min";
	path.extname = ".js"
	}))
	.pipe(gulp.dest("./js-min"));
});  

gulp.task('minify-css', function() {
  return gulp.src('css/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('rename-css', function() {
	gulp.src("./dist/*.css")
	.pipe(rename(function (path) {
	path.dirname += "/";
	path.basename += ".min";
	path.extname = ".css"
	}))
	.pipe(gulp.dest("./css-min"));
}); 

gulp.task('img-compress', function () {
    return gulp.src('image/*.jpg')
        .pipe(imageminJpegtran({progressive: true})())
        .pipe(gulp.dest('image-compress'));
});
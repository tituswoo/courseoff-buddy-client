var gulp = require('gulp');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var copy = require('gulp-copy');
var minifyHTML = require('gulp-minify-html');
var del = require('del');

gulp.task('default', ['clean', 'copy', 'css', 'js', 'minify-html'], function () {
});

gulp.task('clean', function () {
	del(['prod']);
});

gulp.task('js', ['clean'], function() {
	gulp.src('js/*.js')
		.pipe(uglify({
			mangle: true
		}))
		.pipe(gulp.dest('prod/js/'));
});

gulp.task('css', ['clean'], function () {
	return gulp.src('main.css')
		.pipe(csso())
		.pipe(gulp.dest('prod/'));
});

gulp.task('copy', ['clean'], function () {
	gulp.src(['images/**/*', '!images/**/*.ai'])
		.pipe(gulp.dest('prod/images'));

	gulp.src(['manifest.json'])
		.pipe(gulp.dest('prod/'));

	gulp.src(['lib/**/*'])
		.pipe(gulp.dest('prod/lib/'));
});

gulp.task('minify-html', ['clean'], function () {
	gulp.src('popup.html')
		.pipe(minifyHTML({
			conditionals: true,
			sparse: true
		}))
		.pipe(gulp.dest('prod/'));
});
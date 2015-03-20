var gulp = require('gulp');
var csso = require('gulp-csso');

gulp.task('default', function() {
	
});

gulp.task('css', function () {
	return gulp.src('main.css')
		.pipe(csso())
		.pipe(gulp.dest('./prod'));
});
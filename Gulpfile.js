var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('webserver', function() {
	gulp.src('')
		.pipe(webserver({
			livereload: true,
			fallback: "src/index.html",
			port: 8081,
			open: true
		}));
});

gulp.task('run', ['webserver']);

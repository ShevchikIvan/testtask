var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('webserver', function() {
	gulp.src('')
		.pipe(webserver({
			livereload: true,
			fallback: "src/index.html",
			host: '0.0.0.0',
			port: 8081,
			open: true
		}));
});

gulp.task('run', ['webserver']);

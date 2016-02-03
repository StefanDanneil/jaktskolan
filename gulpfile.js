var gulp = require('gulp'),
	runSequence = require('run-sequence'),
	gutil = require( 'gulp-util' ),
	ftp = require( 'vinyl-ftp' ),
	minifyCss = require('gulp-minify-css'),
	gulpif = require('gulp-if'),
	rename = require('gulp-rename'),
	useref = require('gulp-useref'),
	uglify = require('gulp-uglify'),
	rev = require('gulp-rev'),
	revReplace = require('gulp-rev-replace'),
	Server = require('karma').Server,
	config = require('./gulp.conf.json');

gulp.task('default', function() {
	runSequence(
		'html',
		'content',
		'directives',
		'questions',
		'api',
		'htaccess',
		'test',
		'deployDev',
		function (error) {
			if (error) {
				console.log(error.message);
			} else {
				console.log('RELEASE TO ' + config.host.hostname + '/' + config.devDestination + ' (Development) FINISHED SUCCESSFULLY');
			}
		});
});

gulp.task('deployProduction', function() {
	runSequence(
		'html',
		'content',
		'directives',
		'questions',
		'api',
		'htaccess',
		'test',
		'deployProd',
		function (error) {
			if (error) {
				console.log(error.message);
			} else {
				console.log('RELEASE TO ' + config.host.hostname + '/' + config.destination + ' (Production) FINISHED SUCCESSFULLY');
			}
		});
});

gulp.task('html', function(){
	return gulp.src(['index.html'])
		.pipe(useref())
		.pipe(gulpif('*.js',  uglify({mangle: false})))
		.pipe(gulpif('*.css',  minifyCss()))
		.pipe(gulpif('!*.html',rev()))
		.pipe(revReplace())
		.pipe(gulp.dest('build'));
});

gulp.task('content', function(){
	return gulp.src(['Content/**/*', '!Content/css/', '!Content/css/*', '!Content/Js/', '!Content/Js/*'])
		.pipe(gulp.dest('build/Content'));
});

gulp.task('directives', function(){
	return gulp.src('Directives/**/*')
		.pipe(gulp.dest('build/Directives'));
});

gulp.task('questions', function(){
	return gulp.src('Questions/**/*')
		.pipe(gulp.dest('build/Questions'));
});

gulp.task('api', function(){
	return gulp.src('API/**/*')
		.pipe(gulp.dest('build/API'));
});

gulp.task('htaccess', function(){
	return gulp.src('.htaccess')
		.pipe(gulp.dest('build'));
});

gulp.task('test', function(done){
	new Server({
		configFile: __dirname + '/karma.conf.js',
    	singleRun: true
	}, done).start();
});

gulp.task('deployDev', function(){
	var conn = ftp.create( {
		host:     config.host.ftpHost,
		user:     config.host.hostname,
		password: config.host.password,
		parallel: 10,
		log:      gutil.log
	} );

	return gulp.src( 'build/**', { base: 'build', buffer: false } )
        .pipe( conn.newer( '/' + config.devDestination ) ) // only upload newer files
        .pipe( conn.dest( '/' +  config.devDestination ) );
});

gulp.task('deployProd', function(){
	var conn = ftp.create( {
		host:     config.host.ftpHost,
		user:     config.host.hostname,
		password: config.host.password,
		parallel: 10,
		log:      gutil.log
	} );

	return gulp.src( 'build/**', { base: 'build', buffer: false } )
        .pipe( conn.newer( '/' + config.destination ) ) // only upload newer files
        .pipe( conn.dest( '/' + config.destination ) );
});
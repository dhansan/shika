//////////////
// Required //
//////////////
var gulp 		= require('gulp'),
	browserSync	= require('browser-sync').create(),
	minifyCss	= require('gulp-minify-css'),
	sourcemaps	= require('gulp-sourcemaps'),
	uglify		= require('gulp-uglify'),
	imageMin	= require('gulp-imagemin'),
	concat		= require('gulp-concat'),
	prefix		= require('gulp-autoprefixer');

//////////////////
// Images  Task //
//////////////////

gulp.task('images', function(){
	gulp.src(['src/img/**/*'])
		.pipe(imageMin())
		.pipe(gulp.dest('dist/img'))
		.pipe(browserSync.stream());
	});

//////////////////
// Scripts Task //
//////////////////

gulp.task('scripts', function(){
	return gulp.src(['src/scripts/**/*.js'])
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(concat('all.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/scripts'))
		.pipe(browserSync.stream());
	});

//////////////////
// Styles  Task //
//////////////////

gulp.task('styles', function(){
	return gulp.src(['src/styles/**/*.css'])
		.pipe(sourcemaps.init())
		.pipe(prefix())
		.pipe(minifyCss())
		.pipe(concat('all.css'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/styles'))
		.pipe(browserSync.stream());
	});

//////////////////
// Default Task //
//////////////////

gulp.task('default', ['styles', 'scripts', 'images'], function(){
	browserSync.init({
		server: './'
		});

gulp.watch('src/styles/**/*.css', ['styles']); 
gulp.watch('src/scripts/**/*.js', ['scripts']);
gulp.watch('src/img/**/*', ['images']);
gulp.watch('*.html', browserSync.reload);
	});
var gulp = require( 'gulp' ),
	path = require( 'path' ),
	concat = require( 'gulp-concat' ),
	rename = require( 'gulp-rename' ),
	uglify = require( 'gulp-uglify' ),
	cssMinify = require( 'gulp-minify-css' ),
	lessBuild = require( 'gulp-less' ),
	emberTemplates = require( 'gulp-ember-templates' ),
	svg2png = require( 'gulp-svg2png' ),
	order = require( 'gulp-order' ),
	karma = require( 'gulp-karma' ),
	plumber = require( 'gulp-plumber' );

gulp.task( 'svg2png', function () {
	gulp.src( './images/svg/*.svg' )
		.pipe( plumber() )
		.pipe( svg2png() )
		.pipe( gulp.dest( './build/images' ) );
} );

gulp.task( 'less', function () {
	gulp.src( './app/styles/**/*.less' )
		.pipe( plumber() )
		.pipe( lessBuild( {
			paths: [ path.join( __dirname, 'less', 'includes' ) ]
		} ) )
		.pipe( concat( 'style.css' ) )
		.pipe( gulp.dest( './build/css' ) )
		.pipe( cssMinify() )
		.pipe( rename( 'style.min.css' ) )
		.pipe( gulp.dest( './build/css' ) );
} );

gulp.task( 'templates', function () {
	gulp.src( './app/templates/**/*.hbs' )
		.pipe( plumber() )
		.pipe( emberTemplates( {
			name: {
				replace: 'components\\',
				with: 'components/'
			}
		} ) )
		.pipe( concat( 'templates.js' ) )
		.pipe( gulp.dest( './build/js' ) )
		.pipe( uglify() )
		.pipe( rename( 'templates.min.js' ) )
		.pipe( gulp.dest( './build/js' ) );
} );


gulp.task( 'js', function () {
	gulp.src( './app/**/*.js' )
		.pipe( plumber() )
		.pipe( order( [
			'app.js',
			'routes.js'
		] ) )
		.pipe( concat( 'app.js' ) )
		.pipe( gulp.dest( './build/js' ) )
		.pipe( uglify() )
		.pipe( rename( 'app.min.js' ) )
		.pipe( gulp.dest( './build/js' ) )
} );

gulp.task( 'app', [ 'templates', 'js' ] );

gulp.task( 'build-app', [ 'svg2png', 'less', 'templates', 'js' ] );

gulp.task('tests', function() {
	// Be sure to return the stream
	return gulp.src([
			'libs/vendor/jquery/dist/jquery.min.js',
			'libs/vendor/handlebars/handlebars.min.js',
			'libs/vendor/ember/ember.js',
			'libs/vendor/moment/min/moment.min.js',
			'libs/vendor/bootstrap/dist/js/bootstrap.min.js',
			'build/js/app.js',
			'build/js/templates.js',
			'tests/**/*.js'
		])
		.pipe( plumber() )
		.pipe(karma({
			configFile: 'karma.conf.js',
			action: 'run'
		}))
		.on( 'error', console.error.bind(console) );
});

gulp.task( 'watch', function () {
	var lessWatcher = gulp.watch( 'app/styles/**/*.less', [ 'less' ] );

	lessWatcher.on( 'change', function ( event ) {
		console.log( 'File ' + event.path + ' was ' + event.type + ', running LESS building tasks...' );
	} );
} );
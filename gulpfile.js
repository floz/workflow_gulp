var gulp = require( "gulp" )
,	debug = require( "gulp-debug" )
,	changed = require( "gulp-changed" )
,	cached = require( "gulp-cached" )
,	stylus = require( "gulp-stylus" )
,	jade = require( "gulp-jade" )
,	browserSync = require( "browser-sync" )
;

var srcStylus = "src/stylus/*.styl"
,	srcJade = "src/jade/*.jade";

gulp.task( "browser-sync", function() {
	browserSync.init( [ "deploy/css/*.css", "deploy/*.html" ], {
		server: {
			baseDir: "./deploy"
		}
	} )
});

gulp.task( "stylus", function() {

	gulp.src( srcStylus )
		// .pipe( debug( { verbose: false } ) )
		.pipe( cached( srcStylus ) )
		.pipe( changed( srcStylus ) )
		.pipe( stylus( { use: [ "nib" ] } ) )
		.pipe( gulp.dest( "deploy/css/" ) );

});

gulp.task( "jade", function() {

	gulp.src( srcJade )
		// .pipe( debug( { verbose: false } ) )
		.pipe( cached( srcJade ) )
		.pipe( changed( srcJade ) )
		.pipe( jade( { pretty: true, basedir: srcJade } ) )
		.pipe( gulp.dest( "deploy/" ) );

});

gulp.task( "watch", function() {

	gulp.watch( srcStylus, [ "stylus" ] );
	gulp.watch( srcJade, [ "jade" ] );

});

gulp.task( "default", [ "browser-sync", "stylus", "jade", "watch" ] );
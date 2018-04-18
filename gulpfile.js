var gulp = require( 'gulp' );
var sass = require( 'gulp-sass' );
var bs = require( 'browser-sync' );
var u = require( 'gulp-util' );

var scssPath = 'assets/scss/*.scss';
var config = {
	baseurl: 'pixel.local'
};

gulp.task( 'styles', function() {
	return gulp.src( scssPath )
       .pipe( sass( { outputStyle: 'expanded' } ) )
       .pipe( gulp.dest( '.' ) );
});

gulp.task( 'watch-styles', function() {
	gulp.watch( scssPath, ['styles'] );
} );

gulp.task( 'browser-sync', false, function() {
	bs( {
		// Point this to your pre-existing server.
		proxy: config.baseurl + (
			u.env.port ? ':' + u.env.port : ''
		),
		files: ['*.php', 'style.css'],
		// This tells BrowserSync to auto-open a tab once it boots.
		open: true
	}, function( err, bs ) {
		if ( err ) {
			console.log( bs.options );
		}
	} );
} );

gulp.task( 'bs', ['styles', 'browser-sync', 'watch-styles'] );
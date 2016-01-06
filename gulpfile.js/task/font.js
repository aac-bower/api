/*
    Get fonts in the right place
*/
module.exports = function (gulp, plugin, config) {
    return function() {
        return gulp.src( [
            'bower_components/font-awesome/fonts/*.{eot,svg,ttf,woff,woff2}',
            'bower_components/bootstrap-sass/assets/fonts/bootstrap/*.{eot,svg,ttf,woff,woff2}',
        ] )
            .pipe( plugin.plumber( { errorHandler: config.error.handler } ) )
            .pipe( gulp.dest( config.client.dir.fonts ) );
    };
};
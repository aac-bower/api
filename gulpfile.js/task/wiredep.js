/*
    Bower
*/
module.exports = function ( gulp, plugin, config ) {
    return function () {
        // SASS
        gulp.src( config.client.path.vendorScss )
            .pipe( plugin.plumber( { errorHandler: config.error.handler } ) )
            .pipe( plugin.wiredep() )
            .pipe( gulp.dest( config.client.dir.src ) );


        // CSS & JS
        return gulp.src( config.client.path.indexHtml )
            .pipe( plugin.plumber( { errorHandler: config.error.handler } ) )
            .pipe( plugin.wiredep() )
            .pipe( gulp.dest( config.client.dir.src ) );

    };
};
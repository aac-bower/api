/*
    combine and minify assets linked in html
*/
module.exports = function (gulp, plugin, config) {

    return function () {
        var stream = gulp.src( config.client.path.indexHtml )
            .pipe( plugin.useref( {
               noconcat: !config.component.build.production
            } ) )
            .pipe( plugin.if( '*.js', plugin.annotate() ) )
        ;

        if ( config.component.build.production ) {
            stream
                .pipe( plugin.if( '*.js', plugin.uglify() ) )
                .pipe( plugin.if( '*.css', plugin.cssnano() ) );
        }

        return stream
            .pipe( gulp.dest( config.client.dir.build ) );
    };
};
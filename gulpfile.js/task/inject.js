/*
    Injecting all files so we don't have to ref them
*/
module.exports = function (gulp, plugin, config) {

    function inject( source, paths ) {
        var sources = gulp.src( paths, { read: false } );

        return gulp.src( source )
            .pipe( plugin.inject( 
                sources, {
                    ignorePath: 'src', 
                    addRootSlash: false
                } ) )
            .pipe( gulp.dest( config.client.dir.src ) )
        ;
    }

    return function() {

        // inject all scss files in to index.style.scss
        inject(
            config.client.path.styleScss,
            [ config.client.glob.sass ]
        );

        // inject all javascript files into index.html
        return inject(
            config.client.path.indexHtml,
            [
                './src/app/**/*.module.js',        // first all the module definitions
                './src/app/**/*.!(module).js',     // after that all the module components
                './src/app/**/*.js'                // after that all non-module files
            ]
        );
    };
};
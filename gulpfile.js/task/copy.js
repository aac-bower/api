/*
    copy all other files to dist and src files over
*/
module.exports = function (gulp, plugin, config) {


    return function () {

        if ( config.component.build.production ) {

            // copy font files
            gulp.src( plugin.mainBowerFiles( {
                filter: '**/*.{eot,svg,ttf,woff,woff2}'
            } ).concat( config.client.glob.fonts ) )
                .pipe( plugin.plumber({ errorHandler: config.error.handler }) )
                .pipe( gulp.dest( config.client.dir.buildDist + '/asset/fonts' ) );
            
        } else {
            // copy css files
            gulp.src( config.client.glob.css )
              .pipe( gulp.dest( config.client.dir.build + '/css' ) );
            
            // all assets
            gulp.src( config.client.glob.asset )
              .pipe( gulp.dest( config.client.dir.build + '/asset' ) );

            // templates
            gulp.src( config.client.glob.template )
              .pipe( gulp.dest( config.client.dir.build + '/app' ) );

        }


        // copy dev index.html if not in production
        // if ( !config.component.build.production ) {
        //     gulp.src( config.client.path.indexHtml )
        //         .pipe( gulp.dest( config.client.dir.build ) );
        // }

        // copy bower file
        gulp.src( config.client.path.bower )
            .pipe( gulp.dest( config.client.dir.build ) );

        // copy src files
        gulp.src( config.client.glob.src )
            .pipe( gulp.dest( config.client.dir.buildSrc ) );
       
    };
};
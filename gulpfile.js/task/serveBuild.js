

module.exports = function( gulp, plugin, config ) {

    return function() {

        plugin.browserSync.init( {
            notify: false,
            server: {
                baseDir: '.' + config.component.build.root,
                // routes should not be part of the plan... unless we are not yet in production
                routes: {
                    "/bower_components" : config.client.dir.bower
                }
            }
        } );
    };
};
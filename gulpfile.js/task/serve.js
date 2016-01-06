

module.exports = function( gulp, plugin, config ) {

    return function() {

        plugin.browserSync.init( {
            notify: false,
            online: false,
            server: {
                baseDir: config.client.dir.src,
                routes: {
                    "/bower_components" : config.client.dir.bower,      // when we ask for bower components look in this folder
                    "/css"              : config.client.dir.css,        // serve css files from this dir
                    "/data"             : config.client.dir.data        // data folder incase we want to mock an API. Here we can save our json files
                },
            }
        } );
    };
};
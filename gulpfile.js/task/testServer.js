

module.exports = function( gulp, plugin, config ) {
    return function() {
        return plugin.karma.server.start( {
            configFile: config.client.path.karmaConfig,
            singleRun: false 
        } );
    };
};
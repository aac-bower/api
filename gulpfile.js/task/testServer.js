

module.exports = function( gulp, plugin, config ) {
    return function() {
        var Server = plugin.karma.Server;
        var server = new Server( {
            configFile: config.client.path.karmaConfig,
            singleRun: false 
        }, function(exitCode) {
            console.log('Karma has exited with ' + exitCode);
            process.exit(exitCode);
        } );

        return server.start();
    };
};
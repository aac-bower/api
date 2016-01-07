module.exports = function( gulp, plugin, config ) {

    return function() {
    	require('child_process').exec('karma run');
        // plugin.karma.runner.run( {
        //     configFile: config.client.path.karmaConfig
        // } );
    };
};
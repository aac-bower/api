/*
    Unit Testing
*/
module.exports = function (gulp, plugin, config) {
        

<<<<<<< HEAD
        function runTest( done ) {

            var server = new plugin.karma.Server( {
                configFile: __dirname.replace('gulpfile.js\\task', 'karma.conf.js'),
                singleRun: true,
                autoWatch: false
            }, function( failCount) {
                console.log( failCount );
                if ( failCount ) {
                    plugin.notifier.notify( {
                      title: 'Unit test failed',
                      message: failCount + ' test' + (failCount > 1 ? 's' : '') + ' failed while running karma.\nCheck the command line',
                      sound: false // Only Notification Center or Windows Toasters
                    } );
                }
                done();
            } );

            server.start();

            return server;
        }

    return function ( done ) {
        plugin.glob( config.glob.test , {}, function( err, files ) {
            if ( files.length > 0 ) {
                runTest( done );
            } else {
                done();
            }
        } )
       
=======
    return function() {
        plugin.karma.runner.run( {
            configFile: config.client.path.karmaConfig,
            singleRun: false 
        }, function(exitCode) {
            console.log('Karma has exited with ' + exitCode);
            // process.exit(exitCode);
            new Error('my error');
        } );
    	// var karmaRun = require('child_process').exec('karma run');

    	// karmaRun.stdout.on('data', (data) => {
    	// 	// if ( data.match('FAILED') ) {
    	// 	// 	var lines = data.split('\n');

    	// 	// 	for (var i = 0; i < lines.length; i++) {
    	// 	// 		if ( lines[i].match('FAILED') ) {
					// 	// plugin.notify();
    	// 	// 		}
    	// 	// 	};
    	// 	// }
    	// } );
>>>>>>> e455fc46c9645383dbb0508e4510ebda639992f2
    };
};
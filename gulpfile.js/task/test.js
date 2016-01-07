module.exports = function( gulp, plugin, config ) {

    return function() {
    	var karmaRun = require('child_process').exec('karma run');

    	karmaRun.stdout.on('data', (data) => {
    		// if ( data.match('FAILED') ) {
    		// 	var lines = data.split('\n');

    		// 	for (var i = 0; i < lines.length; i++) {
    		// 		if ( lines[i].match('FAILED') ) {
						// plugin.notify();
    		// 		}
    		// 	};
    		// }
    	} );
    };
};
/*
    clean out old build
*/
module.exports = function (gulp, plugin, config) {

    return function () {
        return plugin.del( config.client.dir.build );
    };
};
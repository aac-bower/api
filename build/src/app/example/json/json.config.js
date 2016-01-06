/*
   Config: example.json
*/

(function() {
    'use strict';

    angular
        .module( 'example.json' )
        .config( config )
    ;

    // @ngInject
    function config( ApiProvider ) {
        ApiProvider.setConfig('baseUri', 'app/example/json/');
    }
    
})();
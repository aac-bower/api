/*
   Config: example.api
*/

(function() {
    'use strict';

    angular
        .module( 'example.api' )
        .config( config )
        .constant( 
            'CONSTANT_KEY', {
                
            }
        )
    ;

    // @ngInject
    function config( ApiProvider ) {
        ApiProvider.setConfig('protocol', 'http://');
        ApiProvider.setConfig('baseUri', 'jsonplaceholder.typicode.com');
        ApiProvider.setConfig('defaultHttpMethod', 'GET');
    }
    
})();
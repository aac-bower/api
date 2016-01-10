/*
    Controller: aac.api
*/

(function() {
    'use strict';

    angular
        .module('aac.api')
        .controller('ApiController', ApiController);

    /** @ngInject */
    function ApiController() {
        var vm = this;

        vm.return2 = function() {
            return 2;
        };
    }
})();
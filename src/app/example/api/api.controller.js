/* global angular */
/*
	Controller: example.api
*/

(function () {
	'use strict';

	angular
		.module('example.api')
		.controller('ApiController', ApiController);

	// @ngInject
	function ApiController(api) {
		var vm = this;
		vm.result = undefined;

		/*
			Public Functions
		*/
		vm.call = function () {
			api.call({
				url: '/posts/1',
				resolve: gotApiResult
			});
		};

		/*
			Private Functions
		*/
		function gotApiResult(response) {
			vm.result = response.data;
		}
	}
})();

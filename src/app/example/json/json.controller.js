/* global angular */
/*
	Controller: example.json
*/

(function () {
	'use strict';

	angular
		.module('example.json')
		.controller('JsonController', JsonController);

	// @ngInject
	function JsonController(api) {
		var vm = this;
		vm.result = undefined;

		/*
			Init
		*/
		function init() {

		}
		/*
			Public Functions
		*/
		vm.get = function () {
			api.call({
				url: 'json.json',
				resolve: gotJson
			});
		};

		/*
			Private Functions
		*/
		function gotJson(response) {
			vm.result = response.data;
		}

		init();
	}
})();

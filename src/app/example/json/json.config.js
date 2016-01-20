/* global angular */
/*
   Config: example.json
*/

(function () {
	'use strict';

	angular
		.module('example.json')
		.config(config)
	;

	function config(apiProvider) {
		'ngInject';

		apiProvider.setConfig('baseUri', 'app/example/json/');
	}
})();

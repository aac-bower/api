/* global angular */
/*
   Config: example.api
*/

(function () {
	'use strict';

	angular
		.module('example.api')
		.config(config)
	;

	function config(apiProvider) {
		'ngInject';

		apiProvider.setConfig('protocol', 'http://');
		apiProvider.setConfig('baseUri', 'jsonplaceholder.typicode.com');
		apiProvider.setConfig('defaultHttpMethod', 'GET');
	}
})();

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

	function config(apiProvider, $httpProvider) {
		'ngInject';

		// $httpProvider.defaults.headers.common['Accept'] = '*/*';
  //       $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

		apiProvider.setConfig('protocol', 'http://');
		apiProvider.setConfig('baseUri', 'jsonplaceholder.typicode.com');
		apiProvider.setConfig('defaultHttpMethod', 'GET');
		// apiProvider.setConfig('parseArrayAsJson', true);
	}
})();

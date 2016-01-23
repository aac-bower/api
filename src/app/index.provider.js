/* global angular */
/*
   api-service
*/

(function () {
	'use strict';

	angular
		.module('aac.api')
		.provider('api', api);

	// @ngInject
	function api() {
		'ngInject';

		var config = {
			debug: false,
			protocol: '',
			baseUri: 'api/',
			defaultHttpMethod: 'GET'
		};

		var serviceConstruct = function ($http, $httpParamSerializerJQLike) {
			'ngInject';

			var service = this;
			service.baseUrl = config.protocol + config.baseUri;

			/*
				Public
			*/
			service.call = function (params) {
				if (config.debug) {
					console.log('aac.api | service.call()', params);
				}

				return $http(extendParams(params)).then(
					params.resolve || angular.noop,
					params.reject || reject,
					params.notify || notify
				);
			};

			/*
				Private
			*/
			// extinding the params that are send in to use the defaults if they are not set
			function extendParams(params) {
				params.method = params.method || config.defaultHttpMethod;
				params.url = (params.baseUrl || service.baseUrl) + params.url;
				params.data = parse(params.data, params.method);

				return params;
			}

			// gets called when we the backend responds something else than a http response in the 2XX
			function reject(response) {
				if (config.debug) {
					console.log('aac.api | service.reject()', response);
				}
			}

			// backend can call the notify function in case of file uploads to indicate progress
			function notify(response) {
				if (config.debug) {
					console.log('aac.api | service.notify()', response);
				}
			}

			function parse(data, method) {
				var _data;

				if (
					$http.defaults.headers[method.toLowerCase()] &&
					$http.defaults.headers[method.toLowerCase()]['Content-Type'].match('application/x-www-form-urlencoded')
				) {
					_data = $httpParamSerializerJQLike(data);
				} else {
					_data = JSON.stringify(data);
				}

				return _data;
			}

			return service;
		};

		return {
			setConfig: function (key, value) {
				config[key] = value;
			},
			$get: serviceConstruct
		};
	}
})();

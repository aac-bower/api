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

		// DEPRECATED: config.protocol. just use baseUrl to write in both
		// DEPRECATED: config.baseUri. just use baseUrl to write in both
		var config = {
			debug: false,
			protocol: '',
			baseUri: 'api/',
			baseUrl: undefined,
			defaultHttpMethod: 'GET'
		};

		var serviceConstruct = function ($http, $httpParamSerializerJQLike) {
			'ngInject';

			var service = this;
			service.baseUrl = config.baseUrl || (config.protocol + config.baseUri);

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
				params.data = parse(params.data, params);

				return params;
			}

			// parsing the params.data
			function parse(data, params) {
				var _data;

				// we should serialize params.data in the folowing cases:
				if (
					(
						// if we have params.headers set to overwrite the default and the over writing results in a header set to 'Content-Type': 'application/x-www-form-urlencoded'
						params.headers &&
						params.headers['Content-Type'].match('application/x-www-form-urlencoded')
					) || (
						// or we have default headers for this method set to 'Content-Type': 'application/x-www-form-urlencoded'
						$http.defaults.headers[params.method.toLowerCase()] &&
						$http.defaults.headers[params.method.toLowerCase()]['Content-Type'].match('application/x-www-form-urlencoded') &&
						// and we did not pass headers in to params that can overwrite that setting
						(
							!params.headers ||
							(
								params.headers &&
								!params.headers['Content-Type']
							)
						)
					)
				) {
					_data = $httpParamSerializerJQLike(data);
				} else {
					// if we don't serialize we will make it valid JSON
					_data = JSON.stringify(data);
				}

				return _data;
			}

			// gets called when we the backend responds something else than a http response in the 2XX
			function reject(response) {
				if (config.debug) {
					console.warn('UNCAUGHT REJECT @ aac.api() | service.reject() | uncaught reject', response);
				}
			}

			// backend can call the notify function in case of file uploads to indicate progress
			function notify(response) {
				if (config.debug) {
					console.log('aac.api | service.notify()', response);
				}
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

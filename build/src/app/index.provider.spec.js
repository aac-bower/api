/* global module, describe, beforeEach, inject, it, expect, spyOn, afterEach */
/*
	Spec: aac.api | api
*/
describe('aac.api | api', function () {
	var service;
	var $httpBackend;
	var $httpParamSerializerJQLike;
	var mockController;
	var mockData;
	var mockResponse;
	var mockBackendUrl;

	beforeEach(function () {
		module('aac.api');

		mockData = {
			_string: 'string',
			_int: 1,
			_array: ['item1', 'item2', 'item3'],
			_object: {
				_propertyInt: 1,
				_propertyString: 'string'
			}
		};
		mockResponse = Object({
			data: Object({
				_string: 'string',
				_int: 1,
				_array: ['item1', 'item2', 'item3'],
				_object: Object({
					_propertyInt: 1,
					_propertyString: 'string'
				})
			}),
			status: 200,
			headers: Function,
			config: Object({
				method: 'GET',
				transformRequest: [Function],
				transformResponse: [Function],
				paramSerializer: Function,
				url: 'api/model',
				data: undefined,
				headers: Object({Accept: 'application/json, text/plain, */*'})
			}),
			statusText: ''
		});
		mockBackendUrl = 'http://backend.com/api';
	});

	describe('With default configuration', function () {
		beforeEach(function () {
			inject(function (api, _$httpBackend_, _$httpParamSerializerJQLike_) {
				service = api;
				$httpBackend = _$httpBackend_;
				$httpParamSerializerJQLike = _$httpParamSerializerJQLike_;
			});

			mockController = {
				resolve: function () {},
				reject: function () {}
			};

			spyOn(mockController, 'resolve');
			spyOn(mockController, 'reject');
		});

		afterEach(function () {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});

		describe('| api.call() |', function () {
			it('should call an api endpoint and pass data back to the resolve function', function () {
				$httpBackend
					.when('GET', 'api/model')
					.respond(mockData);

				service.call({
					url: 'model',
					resolve: function (response) {
						mockController.resolve(response.data);
					}
				});
				$httpBackend.flush();

				expect(mockController.resolve).toHaveBeenCalledWith(mockData);
			});

			it('should handle the rejection of a call', function () {
				$httpBackend
					.when('GET', 'api/wrongRequest')
					.respond(404);

				service.call({
					url: 'wrongRequest',
					reject: mockController.reject
				});
				$httpBackend.flush();

				expect(mockController.reject).toHaveBeenCalled();
			});

			describe('when we send data', function () {
				it('should be retrievable on the backend. Default JSON', function () {
					$httpBackend
						.expect('POST', 'api/model', JSON.stringify(mockData))
						.respond();

					service.call({
						method: 'POST',
						url: 'model',
						data: mockData
					});
					$httpBackend.flush();
				});

				describe('and add a paramSerializer', function () {
					it('should serialize it when I set the Content-Type header to \'application/x-www-form-urlencoded\'', function () {
						$httpBackend
							.expect('POST', 'api/model', $httpParamSerializerJQLike(mockData))
							.respond();

						service.call({
							method: 'POST',
							url: 'model',
							data: mockData,
							headers: {
								'Content-Type': 'application/x-www-form-urlencoded'
							}
						});
						$httpBackend.flush();
					});
				});
			});
		});
	});

	describe('With custom $httpProvider.defaults.headers configuration.', function () {
		describe('When we set default headers to x-www-form-urlencoded', function () {
			beforeEach(function () {
				module(function ($httpProvider) {
					$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
				});

				inject(function (api, _$httpBackend_, _$httpParamSerializerJQLike_) {
					service = api;
					$httpBackend = _$httpBackend_;
					$httpParamSerializerJQLike = _$httpParamSerializerJQLike_;
				});
			});

			describe('| api.call() |', function () {
				it('should send the data x-www-form-urlencoded', function () {
					$httpBackend
						.expect('POST', 'api/model', $httpParamSerializerJQLike(mockData))
						.respond();

					service.call({
						method: 'POST',
						url: 'model',
						data: mockData
					});
					$httpBackend.flush();
				});

				it('should send the data like json if we overwrite the default content-type header', function () {
					$httpBackend
						.expect('POST', 'api/model', JSON.stringify(mockData))
						.respond();

					service.call({
						method: 'POST',
						url: 'model',
						data: mockData,
						headers: {
							'Content-Type': 'application/json'
						}
					});
					$httpBackend.flush();
				});
			});
		});
	});

	describe('With custom apiProvider configuration.', function () {
		describe('When we set use apiProvider.setConfig to change the defaults', function () {
			beforeEach(function () {
				module(function (apiProvider) {
					apiProvider.setConfig('debug', true);
					apiProvider.setConfig('baseUrl', mockBackendUrl);
					apiProvider.setConfig('defaultHttpMethod', 'POST');
				});

				inject(function (api, _$httpBackend_) {
					service = api;
					$httpBackend = _$httpBackend_;
				});
			});

			describe('| api.call() |', function () {
				it('should call console log functions when doing requests cause we enabled debug mode', function () {
					spyOn(console, 'log');
					service.call();

					expect(console.log).toHaveBeenCalled();
				});

				describe('after setting \'baseUrl\'', function () {
					it('should call the baseUrl we set', function () {
						$httpBackend
							.expect('POST', mockBackendUrl)
							.respond();

						service.call();
						$httpBackend.flush();
					});

					it('should call the baseUrl we set. Unless we overwrite it', function () {
						$httpBackend
							.expect('POST', mockBackendUrl + '/extended')
							.respond();

						service.call({
							baseUrl: mockBackendUrl + '/extended'
						});
						$httpBackend.flush();
					});
				});

				describe('after setting \'defaultHttpMethod\'', function () {
					it('should use the default method', useDefaultMethod);
					it('should use the default method. Unless we overwrite it', overwriteDefaultMethod);
				});
			});
		});
	});

	function useDefaultMethod() {
		$httpBackend.expect('POST').respond();

		service.call();
		$httpBackend.flush();
	}

	function overwriteDefaultMethod() {
		$httpBackend.expect('GET').respond();

		service.call({
			method: 'GET'
		});
		$httpBackend.flush();
	}
});

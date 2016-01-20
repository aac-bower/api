/* global module, describe, beforeEach, inject, it, expect, spyOn */
/*
	Spec: aac.api | api
*/
describe('aac.api | api', function () {
	var service;
	var backend;
	var mockController;
	var mockData;
	var mockDataSerialized;
	var mockDataFormURLEncoded;
	var mockDataJSON;	
	var mockResponse;	

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
		mockDataJSON = JSON.stringify(mockData);
		mockDataSerialized = '';
		mockDataFormURLEncoded = '';
		mockResponse = Object({ 
			data: Object({ 
				_string: 'string', 
				_int: 1, 
				_array: [ 'item1', 'item2', 'item3' ], 
				_object: Object({ 
					_propertyInt: 1, 
					_propertyString: 'string' 
				}) 
			}), 
			status: 200, 
			headers: Function, 
			config: Object({ 
				method: 'GET', 
				transformRequest: [ Function ], 
				transformResponse: [ Function ], 
				paramSerializer: Function, 
				url: 'api/model', 
				data: undefined, 
				headers: Object({ Accept: 'application/json, text/plain, */*' }) 
			}), 
			statusText: '' 
		});
	});

	describe('With default configuration', function () {

		beforeEach(function () {
			inject(function (api, $httpBackend ) {
				service = api;
				backend = $httpBackend;
			});

			mockController = {
				resolve: function () {},
				reject: function () {}
			};

			spyOn(mockController, 'resolve');
			spyOn(mockController, 'reject');
		});

		afterEach (function () {
			backend.verifyNoOutstandingExpectation();
			backend.verifyNoOutstandingRequest();
		});

		describe(', api.call', function () {
			it('should call an api endpoint and pass data back to the resolve function', function () {
				backend
					.when('GET', 'api/model')
					.respond(mockData); 

				service.call({
					url: 'model',
					resolve: function (response) {
						mockController.resolve(response.data);
					}
				});
				backend.flush();

				expect(mockController.resolve).toHaveBeenCalledWith(mockData);
			});

			it('should handle the rejection of a call', function () {
				backend
					.when('GET', 'api/wrongRequest')
					.respond(404); 

				service.call({
					url: 'wrongRequest',
					reject: mockController.reject
				});
				backend.flush();

				expect(mockController.reject).toHaveBeenCalled();
			});

			describe('when we send data', function() {
				it('should be retrievable on the backend. Default JSON', function () {
					backend
						.expect('POST', 'api/model', mockDataJSON)
						.respond(); 

					service.call({
						method: 'POST',
						url: 'model',
						data: mockData
					});
					backend.flush();
				});

				describe('and add a paramSerializer', function() {
					it('should serialize it', function() {
						// testing the normal serializer
						// https://docs.angularjs.org/api/ng/service/$httpParamSerializer
					});

					it('should serialize it', function() {
						// testing $httpParamSerializerJQLike
						// https://docs.angularjs.org/api/ng/service/$httpParamSerializerJQLike
					});
				});
			})
		});
	});

	describe('With custom configuration.', function () {
	    describe('When we set default headers to x-www-form-urlencoded', function () {
	        beforeEach(function () {
	            module(function (apiProvider, $httpProvider) {
	                apiProvider.setConfig('debug', true);
	            });

	            inject(function (api) {
	                service = api;
	            });
	        });

	        describe(', api.call', function () {
	            it('should send the data x-www-form-urlencoded', function () {
	                
	            });
	        });
	    });

	    describe('When we set default headers to x-www-form-urlencoded and force arrays to be JSON encoded', function () {
	        beforeEach(function () {
	            module(function (apiProvider, $httpProvider) {
	                apiProvider.setConfig('debug', true);
	            });

	            inject(function (api) {
	                service = api;
	            });
	        });

	        describe(', api.call', function () {
	            it('should send the data x-www-form-urlencoded but JSON.encode() arrays', function () {
	                
	            });
	        });
	    });
	});
});

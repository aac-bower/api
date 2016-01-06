describe('Testing the Api Controller', function(){
    var mockDataSvc, rootScope, scope, passPromise, firstController, apiController;

    beforeEach(function() {
        module('aac.api');
    });

    beforeEach(inject(function($controller){
      apiController = $controller('ApiController', {
        dataSvc: mockDataSvc
      });
    }));

    it('should have set pattern to match numbers', function(){
        expect(apiController.return2).toBeDefined();
        expect(apiController.return2()).toBe(2);
    });
});
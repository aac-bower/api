describe( 'Api Controller |', function(){
    var mockDataSvc, rootScope, scope, passPromise, firstController, apiController;

    beforeEach(function() {
        module('aac.api');
    });

    beforeEach(inject(function($controller){
      apiController = $controller('ApiController', {
        dataSvc: mockDataSvc
      });
    }));

    describe( 'vm.return2()', function() {
        it('will return 2', function(){
            expect(apiController.return2).toBeDefined();
            expect(apiController.return2()).toBe(2);
        });

        it('function return2 will return 2', function(){
            expect(apiController.return2).toBeDefined();
            expect(apiController.return2()).toBe(2);
        });

        it('should fail if we expect 3', function(){
            expect(apiController.return2).toBeDefined();
            expect(apiController.return2()).not.toBe(3);
        });
    } );

});
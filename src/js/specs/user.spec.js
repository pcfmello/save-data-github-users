describe('User Tests', () => {

    var UserCtrlTest;

    beforeEach(angular.mock.module('app'))

    beforeEach(inject(function($controller,$rootScope) {
        userScope = $rootScope.$new()
        $controller('UserCtrl', {
             '$scope': userScope
         });       
     }));    
});
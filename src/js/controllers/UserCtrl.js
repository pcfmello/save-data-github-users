angular.module('app')
    .controller('UserCtrl', function($scope, localStorageService) {

        $scope.message = "Module User is running!"
               
        $scope.getAll = () => localStorageService.keys();
        $scope.get = (username) => localStorageService.get(username);
        $scope.submit = (username, description) => localStorageService.set(username, description);

    });
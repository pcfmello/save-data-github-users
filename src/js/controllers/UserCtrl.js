angular.module('app')
    .controller('UserCtrl', function($scope, localStorageService, UserService) {

        $scope.message = "Module User is running!"
        $scope.query = '';
        $scope.user = {};
        $scope.userProjectList = [];

        $scope.getUserByUsername = () => {
            UserService.getUserByUsername($scope.query)
                .then(
                    (response) => {
                        $scope.user = response.data
                        $scope.getUserProjects($scope.user.login);
                    },
                    (err) => console.log(err))
        }

        $scope.getUserProjects = username => {
            UserService.getUserProjects(username)
                .then(
                    (response) => $scope.userProjectList = response.data,
                    (err) => console.log(err)
            )       
        }
        
               
        $scope.get = (username) => localStorageService.get(username);
        $scope.saveUserDescription = (username, description) => localStorageService.set(username, description);

    });
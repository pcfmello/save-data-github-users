angular.module('app')
    .config(($routeProvider) => 
        $routeProvider
            .when('/', {
                templateUrl: 'views/user/index.html',
                controller: 'UserCtrl'
            })
    )
    .config((localStorageServiceProvider) => {
        localStorageServiceProvider
          .setPrefix('save-data-github-users');
      });

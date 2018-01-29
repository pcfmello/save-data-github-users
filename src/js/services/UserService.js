angular.module('app')
    .factory('UserService', function($http) {

        const BASE_URL = 'https://api.github.com';

        let userUrl = `${BASE_URL}/users`;

        return {
            getUserByUsername: getUserByUsername,
            getUserProjects: getUserProjects
        }

        function getUserByUsername(username) {
            return $http({
                method: 'GET',
                url: `${userUrl}/${username}`
            });            
        } 

        function getUserProjects(username) {
            return $http({
                method: 'GET',
                url: `${userUrl}/${username}/repos`
            });
        } 

    });
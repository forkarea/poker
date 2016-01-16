(function () {
    var app = angular.module("gorrionPoker");

    app.factory('authenticationService', function () {
        var auth = {
            isLogged: false
        }

        return auth;
    });
    
    app.factory('userService', function ($http) {
        return {
            logIn: function (username, password) {
                return $http.post('/api/authenticate', { username: username, password: password });
            },

            logOut: function () {

            }
        }
    });

})();

var page = angular.module('tempus', ['ngRoute', 'ngAnimate']);

page.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'home.html',
            controller: 'home'
        }).when('/login', {
            templateUrl: 'login.html',
            controller: 'login'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);
page.controller('home', function($scope) {

});
page.controller('login', function($scope) {

});

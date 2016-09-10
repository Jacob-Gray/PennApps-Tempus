var page = angular.module('tempus', ['ngRoute', 'ngAnimate']);

page.config(['$routeProvider','$locationProvider',
    function($routeProvider, $locationProvider) {
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
        $locationProvider.html5Mode(true);
    }
]);
page.controller('home', function($scope) {

});
page.controller('login', function($scope) {

});

var page = angular.module('tempus', ['ngRoute', 'ngAnimate']);

page.config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider) {
		$routeProvider.
		when('/', {
			templateUrl: 'home.html',
			controller: 'home'
		}).when('/login', {
			templateUrl: 'login.html',
			controller: 'login'
		}).when('/signup', {
			templateUrl: 'signup.html',
			controller: 'signup'
		}).
		otherwise({
			redirectTo: '/'
		});
		// $locationProvider.html5Mode(true);
	}
]);
var setHeader = null;

page.controller('home', function($scope) {
  $("header p").html("Already have an account?");
  $("header a.btn").html("Login").attr("href","#login");
});
page.controller('login', function($scope) {
  $("header p").html("Don't have an account?");
  $("header a.btn").html("Sign up").attr("href","#signup");
});
page.controller('signup', function($scope) {
  $("header p").html("Already have an account?");
  $("header a.btn").html("Login").attr("href","#login");
});

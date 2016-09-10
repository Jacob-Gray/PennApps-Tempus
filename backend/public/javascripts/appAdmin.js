var page = angular.module('tempus', ['ngRoute', 'ngAnimate']);

page.config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider) {
		$routeProvider.
		when('/', {
			templateUrl: 'activities.html',
			controller: 'activities'
		}).
		otherwise({
			redirectTo: '/'
		});
		// $locationProvider.html5Mode(true);
	}
]);

page.controller('activities', function($scope, $http) {
	$("header p").html("Welcome to Tempus, " + window.current_user + "!");
	$("header a.btn").html("Logout").attr("href", "").on("click", function() {
		var req = {
			method: 'POST',
			url: '/logout'
		}
		$http(req).then(function(data) {
			location = "/"
		}, function(data) {
			console.log(data)
		});
	});
});

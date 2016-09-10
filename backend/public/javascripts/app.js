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
		$locationProvider.html5Mode(true);
	}
]);
var setHeader = null;

page.controller('home', function($scope) {
	$("header p").html("Already have an account?");
	$("header a.btn").html("Login").attr("href", "login");
});
page.controller('login', function($scope, $http) {
	$("header p").html("Don't have an account?");
	$("header a.btn").html("Sign up").attr("href", "signup");

  $(".login form").on("submit", function() {
    console.log("submitted")
    var req = {
      method: 'POST',
      url: '/login',
      data: $scope.user
    }
    $http(req).then(function(data) {
      if(data) location = "/";
      else{
        $(".noti").html("That email/password combination is invalid.").fadeIn();
        setTimeout(function(){
          $(".noti").fadeOut();
        }, 3000);
      }
    }, function(data) {
      console.log(data)
    });
  });
});
page.controller('signup', function($scope, $http) {
	$("header p").html("Already have an account?");
	$("header a.btn").html("Login").attr("href", "login");

	$(".signup form").on("submit", function() {
    console.log("submitted")
		var req = {
			method: 'POST',
			url: '/register',
			data: $scope.user
		}
		$http(req).then(function(data) {
      $(".noti").html("Your account has been created, please <a href='#login'>Login</a>").fadeIn();
		}, function(data) {
			console.log(data)
		});
	});

})

var page = angular.module('tempus', ['ngRoute', 'ngAnimate']);

page.config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider) {
		$routeProvider.
		when('/', {
			templateUrl: 'activities.html',
			controller: 'activities'
		}).
		when('/task', {
			templateUrl: 'task.html',
			controller: 'task'
		}).
		when('/schedule', {
			templateUrl: 'schedule.html',
			controller: 'schedule'
		}).
		otherwise({
			redirectTo: '/'
		});
		$locationProvider.html5Mode(true);
	}
]);

page.controller('activities', function($scope, $http) {

	$("header p").html("Welcome to Tempus, " + window.current_user + "!");


	var data = {
	    labels: ["January", "February", "March", "April", "May", "June", "July"],
	    datasets: [
	        {
	            label: "Recorded time",
	            backgroundColor: [
	                'rgba(255, 99, 132, 0.2)',
	                'rgba(54, 162, 235, 0.2)',
	                'rgba(255, 206, 86, 0.2)',
	                'rgba(75, 192, 192, 0.2)',
	                'rgba(153, 102, 255, 0.2)',
	                'rgba(255, 159, 64, 0.2)'
	            ],
	            borderColor: [
	                'rgba(255,99,132,1)',
	                'rgba(54, 162, 235, 1)',
	                'rgba(255, 206, 86, 1)',
	                'rgba(75, 192, 192, 1)',
	                'rgba(153, 102, 255, 1)',
	                'rgba(255, 159, 64, 1)'
	            ],
	            borderWidth: 1,
	            data: [65, 59, 80, 81, 56, 55, 40],
	        },
	        {
	            label: "Scheduled time",
	            backgroundColor: [
	                'rgba(255, 99, 132, 0.2)',
	                'rgba(54, 162, 235, 0.2)',
	                'rgba(255, 206, 86, 0.2)',
	                'rgba(75, 192, 192, 0.2)',
	                'rgba(153, 102, 255, 0.2)',
	                'rgba(255, 159, 64, 0.2)'
	            ],
	            borderColor: [
	                'rgba(255,99,132,1)',
	                'rgba(54, 162, 235, 1)',
	                'rgba(255, 206, 86, 1)',
	                'rgba(75, 192, 192, 1)',
	                'rgba(153, 102, 255, 1)',
	                'rgba(255, 159, 64, 1)'
	            ],
	            borderWidth: 1,
	            data: [69, 57, 83, 9, 34, 88, 56],
	        }
	    ]
	};
	$scope.renderCanvas = function(){
		var activity_chart = $("#activitychart");

		activity_chart.attr("width", activity_chart.parent().width());
		var myBarChart = new Chart(activity_chart, {
			type: 'bar',
			data: data
		});
	}



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

page.controller('task', function($scope, $http) {

});

page.controller('schedule', function($scope, $http) {
console.log("what")
});

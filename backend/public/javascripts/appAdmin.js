var page = angular.module('tempus', ['ngRoute', 'ngAnimate']);

page.config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider) {
		$routeProvider.
		when('/', {
			templateUrl: 'activities.html',
			controller: 'activities'
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

	$http({
		method: 'POST',
		url: '/viewTask'
	}).then(function(data) {
		$scope.tasks = data.data[0].tasks;
	});

	$scope.showTask = function() {
		$(".white_box_wrapper").addClass("show");
	}
	$scope.hideTask = function() {
		$(".white_box_wrapper").removeClass("show");
	}

	$http({
		method: 'POST',
		url: '/viewReport',
	}).then(function(data) {
		console.log(data)
	});

	$scope.startTimer = function($event, $el) {
		if (!$scope.timerRunning) {
			$scope.timerRunning = true;
			var req = {
				method: 'POST',
				url: '/startTask',
				data: {
					"name": $el.task.name,
					"start": Date.now(),
					"schedule": "Monday"
				}
			}
			$http(req).then(function(data) {
				console.log(data)
			});

			$($event.currentTarget).addClass("timing")

			$(".header-timer").fadeIn();
			var time = {};
			time.min = 0;
			time.sec = 0;
			time.hour = 0;
			renderedTime = "";
			$(".header-timer .time").html("0:00");
			$scope.timerInterval = setInterval(function() {
				time.sec++;
				if (time.sec > 59) {
					time.sec = 0;
					time.min++;
					if (time.min > 59) {
						time.min = 0;
						time.hour++;
					}
				}
				renderedTime = (time.hour > 0 ? time.hour + ":" : "") + time.min + ":" + (time.sec < 10 ? "0" : "") + time.sec;
				$(".header-timer .time").html(renderedTime);
			}, 1000);
			$(".header-timer .timer-text").html($el.task.name);
		} else {
			$(".header-timer").fadeOut();
			$scope.timerRunning = false;

			clearInterval($scope.timerInterval);
		}
	}

	$("header p").html("Welcome to Tempus, " + window.current_user + "!");


	var data = {
		labels: ["January", "February", "March", "April", "May", "June", "July"],
		datasets: [{
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
		}, {
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
		}]
	};
	$scope.renderCanvas = function() {
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
	$scope.task = {};
	$scope.task.style = "purple_paradise";

	$(".white_box form").on("submit", function() {
		$scope.task.sms = ($scope.task.sms) ? true : false;
		var req = {
			method: 'POST',
			url: '/addTask',
			data: $scope.task
		}
		$http(req).then(function() {
			location = "/";
		}, function(data) {
			console.log(data)
		});
	});

	$(".white_box .buttons div").on("click", function() {
		$scope.task.style = this.className.split(" ")[1];
		$(".white_box .buttons div.selected").removeClass("selected");
		$(this).addClass("selected");
	});
});

page.controller('schedule', function($scope, $http) {
	var schedule = [],
		first_point = false;

	$scope.create = function() {
		$http({
			method: 'POST',
			url: '/addSchedule',
			data: {
				"tasks": schedule,
				"name": "Monday"
			}
		}).then(function(data) {
			console.log(data)
		});
	}

	$scope.currentTask = false;
	$http({
		method: 'POST',
		url: '/viewTask'
	}).then(function(data) {
		console.log(data.data[0].tasks)
		$scope.tasks = data.data[0].tasks;
	});

	$scope.addCurrent = function($event, $el) {
		$(".task-item.active").removeClass("active");
		$($event.currentTarget).addClass("active");
		$scope.currentTask = {
			name: $el.task.name,
			style: $el.task.style
		};
	}

	$(".morning_box li, .afternoon_box li").on("click", function() {
		if (first_point === false && $scope.currentTask !== false) {
			first_point = parseInt($(this).attr("data-time"));
		} else if ($scope.currentTask !== false) {

			var x = $(".morning_box li, .afternoon_box li");

			for (var y = first_point; y <= parseInt($(this).attr("data-time")); y++) {
				x[y].classList.add($scope.currentTask.style)
			}
			schedule.push({
				"task": $scope.currentTask.name,
				"start": new Date(new Date().setHours(first_point)).toISOString(),
				"end": new Date(new Date().setHours(parseInt($(this).attr("data-time")))).toISOString()
			});
			console.log(schedule)

			$(".task-item.active").removeClass("active");

			$scope.currentTask = false;
			first_point = false;
		}
	});
});

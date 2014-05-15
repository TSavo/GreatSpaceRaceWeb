var db = new Firebase('https://greatspacerace.firebaseio.com');

var GreatSpaceRace = angular.module('GreatSpaceRace', [ 'ngRoute',
		'GreatSpaceRace.Controllers' ]);

GreatSpaceRace.factory('UserService', [ function() {
	var sdo = {
		isLogged : "no",
		username : ''
	};
	return sdo;
} ]);

GreatSpaceRace.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : 'home.html'
	}).when('/Team', {
		templateUrl : 'team.html',
		controller : 'TeamDetailController'
	}).otherwise({
		redirectTo : '/'
	});
} ]);

var controllers = angular.module('GreatSpaceRace.Controllers', []);

controllers.controller('LoginController', [
		'$scope',
		'$http',
		'UserService',
		function(scope, $http, UserService) {
			scope.isLogged = false;
			var auth = new FirebaseSimpleLogin(db, function(error, user) {
				if (error) {
					console.log(error);
				} else if (user) {
					// user authenticated with Firebase
					console.log('User ID: ' + user.uid + ', Provider: '
							+ user.provider);
					// successful login
					UserService.isLogged = "yes";
					UserService.username = user.displayName;
					scope.$apply();
				} else {
					UserService.isLogged = "no";
					UserService.username = '';
					scope.$apply();
				}
			});
			scope.login = function() {
				UserService.isLogged = "waiting";
				auth.login('google', {
					rememberMe : true,
					scope : 'https://www.googleapis.com/auth/plus.login'
				});
			}
			scope.logout = function() {
				auth.logout();
			}
			scope.UserService = UserService;
		} ]);

controllers.controller('IndexCtrl', function($scope) {

});
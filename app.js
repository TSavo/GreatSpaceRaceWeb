var GreatSpaceRace = angular.module('GreatSpaceRace', [ 'ngRoute',
		'GreatSpaceRace.Controllers' ]);

GreatSpaceRace.factory('UserService', [ function() {
	var sdo = {
		isLogged : false,
		username : ''
	};
	return sdo;
} ]);

GreatSpaceRace.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : 'home.html'
	}).when('/Track', {
		templateUrl : 'trackList.html',
		controller : 'TrackListController'
	}).when('/Track/:trackId', {
		templateUrl : 'trackDetail.html',
		controller : 'TrackDetailController'
	}).otherwise({
		redirectTo : '/'
	});
} ]);

var controllers = angular.module('GreatSpaceRace.Controllers', [ "firebase" ]);

controllers.controller('LoginController', [
		'$scope',
		'$http',
		'UserService',
		function(scope, $http, UserService) {
			scope.isLogged = false;
			var db = new Firebase(
					'https://greatspacerace.firebaseio.com/Track/testtrack');
			var auth = new FirebaseSimpleLogin(db, function(error, user) {
				if (error) {
					console.log(error);
				} else if (user) {
					// user authenticated with Firebase
					console.log('User ID: ' + user.uid + ', Provider: '
							+ user.provider);
					// successful login
					UserService.isLogged = true;
					UserService.username = user.displayName;
					scope.$apply();
				} else {
					UserService.isLogged = false;
					UserService.username = '';
					scope.$apply();
				}
			});
			scope.login = function() {
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
	var db = new Firebase(
			'https://greatspacerace.firebaseio.com/Track/testtrack');

	db.once("value", function(crap) {
		visualize({
			Track : crap.val()
		}, document.getElementById("canvas"));
	});
});

controllers.factory("trackDB", [ "$firebase", function($firebase) {
	var ref = new Firebase("https://greatspacerace.firebaseio.com/Track");
	return $firebase(ref);
} ]);

controllers.controller("TrackListController", [ "$scope", "trackDB",
		function($scope, trackDB) {
			trackDB.$bind($scope, "Tracks");
		} ]);


controllers.controller("TrackDetailController", [
		"$scope",
		"$routeParams",
		function($scope, routeParams) {
			var db = new Firebase(
					"https://greatspacerace.firebaseio.com/Track/"
							+ routeParams.trackId);
			var terminate = {stop:false};
			db.once("value", function(data) {
				draw({
					Track : data.val()
				}, document.getElementById("canvas"));
			});
		} ]);
var db = new Firebase('https://greatspacerace.firebaseio.com');
var auth = new FirebaseSimpleLogin(db, function(error, user) {
	if (error) {
		// an error occurred while attempting login
		console.log(error);
	} else if (user) {
		// user authenticated with Firebase
		console.log('User ID: ' + user.uid + ', Provider: ' + user.provider);
	} else {
		// user is logged out
	}
});

function login() {
	auth.login('google', {
		rememberMe : true,
		scope : 'https://www.googleapis.com/auth/plus.login'
	});
}

var greatSpaceRaceApp = angular.module('greatSpaceRaceApp', [ 'ngRoute',
		'greatSpaceRaceAppControllers' ]);

greatSpaceRaceApp.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : 'home.html'
	}).when('/Team', {
		templateUrl : 'team.html',
		controller : 'TeamDetailController'
	}).otherwise({
		redirectTo : '/'
	});
} ]);

var greatSpaceRaceAppControllers = angular.module('greatSpaceRaceAppControllers', []);

greatSpaceRaceAppControllers.controller('IndexCtrl', function($scope) {

});
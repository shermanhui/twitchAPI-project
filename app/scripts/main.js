(function(){
	'use strict';

	// let streamers = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff"];

	function twitchDataService($http, endpoint, streamers){
		return {
			lookUp: function(){
				angular.forEach(streamers, function(streamer){
					$http.jsonp(endpoint + streamer + '?callback=JSON_CALLBACK')
						.then(function(res){
						// console.log(res.data);
						// console.log('_links', res.data['_links']);
						// console.log('status', res.data.stream);
						// async js
						let data = res.data;
						console.log('delayed', data);
						return data;
					});
				});
			}
		};
	}

	twitchDataService.$inject = ['$http', 'endpoint', 'streamers'];

	function twitchAppCtrl($scope, twitchDataService, streamers){
		let self = $scope.tc = this;

		self.streamers = streamers;

		// self.results = function(){
		// 	twitchDataService.lookUp().then(function(res){
		// 		console.log(res);
		// 	})
		// }

	}

	twitchAppCtrl.$inject = ['$scope', 'twitchDataService', 'streamers']

	angular
		.module('twitchApp', [])
		.constant('endpoint', 'https://api.twitch.tv/kraken/channels/')
		.constant('streamers', ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff","brunofin","comster404","test_channel","cretetion","sheevergaming","TR7K","OgamingSC2","ESL_SC2"])
		.controller('twitchAppCtrl', twitchAppCtrl)
		.service('twitchDataService', twitchDataService);
})();

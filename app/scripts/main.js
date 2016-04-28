(function(){
	'use strict';

	// let streamers = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff"];

	function twitchDataService($http, $q, endpoint, streamers){
		return {
			lookUp: function(){
				//go through each streamer and return appropriate url
				let urls = streamers.map(function(streamer){
					return endpoint + streamer + '?callback=JSON_CALLBACK';
				});

				// go through each streamer and make a call, q makes a cb after all requests resolve
				return $q.all(urls.map(function(url){
					return $http.jsonp(url).then(function(res){
						let data = res.data;
						console.log(res.data);
                        return data;
					});
				}));
			}
		};
	}

	twitchDataService.$inject = ['$http', '$q', 'endpoint', 'streamers'];

	function twitchAppCtrl($scope, $q, twitchDataService, streamers){
		let self = $scope.tc = this;

		self.streamers = streamers;

		self.lookUp = function(){
			twitchDataService.lookUp();
			// $q.all(twitchDataService.lookUp()).then(function(res){
			// 	console.log('result', res);
			// });
		};
		// self.results = function(){
		// 	twitchDataService.lookUp().then(function(res){
		// 		console.log(res);
		// 	})
		// }

	}

	twitchAppCtrl.$inject = ['$scope', '$q', 'twitchDataService', 'streamers'];

	angular
		.module('twitchApp', [])
		.constant('endpoint', 'https://api.twitch.tv/kraken/channels/')
		.constant('streamers', ['freecodecamp', 'storbeck', 'terakilobyte', 'habathcx', 'RobotCaleb', 'thomasballinger', 'noobs2ninjas', 'beohoff', 'brunofin', 'comster404', 'test_channel', 'cretetion', 'sheevergaming', 'TR7K', 'OgamingSC2', 'ESL_SC2'])
		.controller('twitchAppCtrl', twitchAppCtrl)
		.service('twitchDataService', twitchDataService);
})();

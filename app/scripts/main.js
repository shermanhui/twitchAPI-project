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

        twitchDataService.lookUp().then(function(res){
			console.log('res.data', res);
			return res.map(function(response){
				if (!response.error){
					return {
						name: response.name,
						url: response.url,
						status: response.status,
						banner: response.profile_banner
					};
				} else {
					return {
						message: response.message
					};
				}
			});
		}).then(function(data){
			console.log(data);
			self.data = data;
		});

	}

	twitchAppCtrl.$inject = ['$scope', '$q', 'twitchDataService', 'streamers'];

	angular
		.module('twitchApp', [])
		.constant('endpoint', 'https://api.twitch.tv/kraken/channels/')
		.constant('streamers', ['brunofin', 'comster404', 'freecodecamp', 'storbeck', 'terakilobyte', 'habathcx', 'RobotCaleb', 'thomasballinger', 'noobs2ninjas', 'beohoff', 'test_channel', 'cretetion', 'sheevergaming', 'TR7K', 'OgamingSC2', 'ESL_SC2'])
		.controller('twitchAppCtrl', twitchAppCtrl)
		.service('twitchDataService', twitchDataService);
})();

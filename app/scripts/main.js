(function(){
	'use strict';

	// let streamers = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff"];

	function twitchDataService($http, $q, streamers){
		return {
			lookUp: function(url){
				let endpoints = streamers.map(function(streamer){
					let endpoint = url + streamer + '?callback=JSON_CALLBACK';
					return endpoint;
				});

				return $q.all(endpoints.map(function(endpoint){
						return $http.jsonp(endpoint).then(function(response){
							let data = response.data;
							return data;
						});
				}));
			}
			// lookUp: function(){
			// 	//go through each streamer and return appropriate url
			// 	let ChannelUrls = streamers.map(function(streamer){
			// 		return channelEndpoint + streamer + '?callback=JSON_CALLBACK';
			// 	});
			//
			// 	let streamUrls = streamers.map(function(streamer){
			// 		return streamUrls + streamer + '?callback=JSON_CALLBACK';
			// 	});
			//
			// 	// go through each streamer and make a call, q makes a cb after all requests resolve
			// 	return $q.all(urls.map(function(url){
			// 		return $http.jsonp(url).then(function(res){
			// 			let data = res.data;
			// 			console.log(res.data);
            //             return data;
			// 		});
			// 	}));
			// }
		};
	}

	twitchDataService.$inject = ['$http', '$q', 'streamers'];

	function twitchAppCtrl($scope, $q, twitchDataService, channelEndpoint, streamEndpoint, streamers){
		let self = $scope.tc = this;

		self.streamers = streamers;

		console.log(channelEndpoint);

		twitchDataService.lookUp(channelEndpoint).then(function(res){
			console.log(res);
		});

		twitchDataService.lookUp(streamEndpoint).then(function(res){
			res.forEach(function(data){
				console.log(data);
				if (data.stream === null){
					console.log('streamer is offline');
				} else if (data.stream === undefined){
					console.log('streamer does not exist or account has been deleted');
				} else {
					console.log('streamer is online', data.stream['_links'].self);
				}
			});
		});


        // twitchDataService.lookUp().then(function(res){
		// 	console.log('res.data', res);
		// 	return res.map(function(response){
		// 		if (!response.error){
		// 			return {
		// 				name: response.name,
		// 				url: response.url,
		// 				status: response.status,
		// 				banner: response.profile_banner
		// 			};
		// 		} else {
		// 			return {
		// 				message: response.message
		// 			};
		// 		}
		// 	});
		// }).then(function(data){
		// 	console.log(data);
		// 	self.data = data;
		// });

	}

	twitchAppCtrl.$inject = ['$scope', '$q', 'twitchDataService', 'channelEndpoint', 'streamEndpoint', 'streamers'];

	angular
		.module('twitchApp', [])
		.constant('channelEndpoint', 'https://api.twitch.tv/kraken/channels/')
		.constant('streamEndpoint', 'https://api.twitch.tv/kraken/streams/')
		.constant('streamers', ['brunofin', 'comster404', 'freecodecamp', 'storbeck', 'terakilobyte', 'habathcx', 'RobotCaleb', 'thomasballinger', 'noobs2ninjas', 'beohoff', 'test_channel', 'cretetion', 'sheevergaming', 'TR7K', 'OgamingSC2', 'ESL_SC2'])
		.controller('twitchAppCtrl', twitchAppCtrl)
		.service('twitchDataService', twitchDataService);
})();

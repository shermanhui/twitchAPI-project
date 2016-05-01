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
							let data = response.data,
								streamer = {},
								streamerData = [];

							if (data.stream === null){
								streamer.status = 'offline',
								streamer.url = data['_links'].channel;
								streamerData.push(streamer);
								console.log('streamer is offline');
							} else if (data.stream === undefined || data.error){
								streamer.status = 'account does not exist';
								streamerData.push(streamer);
								console.log('streamer does not exist or account has been deleted');
							} else if (data.stream){
								streamer.name = data.display_name,
								streamer.url = data['_links'].channel,
								streamer.status = 'online',
								streamer.logo = '',
								streamer.excerpt = data.status;
								streamerData.push(streamer);
								//self.streamerInfo.push(data.stream['_links'].self);
								//console.log('streamer is online', data.stream['_links'].self);
							}
							return streamerData;
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


		twitchDataService.lookUp(streamEndpoint).then(function(res){
			console.log(res);
			res.forEach(function(data){
				console.log(data);
			});
		}).then(function(){
			twitchDataService.lookUp(channelEndpoint).then(function(res){
				console.log('should have full streamer object', res);
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

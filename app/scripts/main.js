(function(){
	'use strict';

	// let streamers = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff"];

	function twitchDataService($http, $q, streamers){
		return {
			lookUp: function(url, type){
				let endpoints = streamers.map(function(streamer){
					let endpoint = url + type + '/' + streamer + '?callback=JSON_CALLBACK';
					console.log(endpoint);
					return endpoint;
				});
				// let endpoints = streamers.map(function(streamer){
				// 	let endpoint = url + streamer + '?callback=JSON_CALLBACK';
				// 	return endpoint;
				// });


				return $q.all(endpoints.map(function(endpoint){
					return $http.jsonp(endpoint).then(function(response){
						console.log(response.data);
						let data = response.data;
						return data;
					});
					// else if (endpoint.includes('channel')){
					// 	console.log('channel data');
					// };
					// return $http.jsonp(endpoint).then(function(response){
					// 	let data = response.data,
					// 		streamer = {},
					// 		streamerData = [];
					// 	console.log('full returned data', data);
					// 	if (data.stream === null){
					// 		streamer.status = 'offline',
					// 		streamer.url = data['_links'].channel;
					// 		streamerData.push(streamer);
					// 		//console.log('streamer is offline');
					// 	} else if (data.stream === undefined || data.error){
					// 		streamer.status = 'account does not exist';
					// 		streamerData.push(streamer);
					// 		//console.log('streamer does not exist or account has been deleted');
					// 	} else {
					// 		//this is where i should make the call to channel data bc then we have online streamers
					// 		streamer.name = data.display_name,
					// 		streamer.url = data['_links'].channel,
					// 		streamer.status = 'online',
					// 		streamer.logo = '',
					// 		streamer.excerpt = data.status;
					// 		//console.log('streamer object', streamer);
					// 		streamerData.push(streamer);
					// 		//self.streamerInfo.push(data.stream['_links'].self);
					// 		//console.log('streamer is online', data.stream['_links'].self);
					// 	}
					// 	return streamerData;
					// });
				}));
			}
		};
	}

	twitchDataService.$inject = ['$http', '$q', 'streamers'];

	function twitchAppCtrl($scope, $q, twitchDataService, endpoint, streamers){
		let self = $scope.tc = this;

		self.streamers = streamers;

		self.streamerData = [];

		//twitchDataService.lookUp(endpoint, 'channel');
		twitchDataService.lookUp(endpoint, 'streams').then(function(res){
			res.forEach(function(data){
				self.streamer = {
					name: null,
					url: null,
					status: 'offline'
				};
				if (data.stream === null){
					self.streamer.name = 'streamer sleeping';
					self.streamer.status = 'offline';
					self.streamer.url = data['_links'].self;
				} else if (data.stream === undefined){
					self.streamer.name = 'streamer dead';
					self.streamer.status = 'account does not exist';
					self.streamer.url = 'http://i.imgur.com/nJDOS.png';
				} else {
					self.streamer.name = 'streamer online';
					self.streamer.status = 'online';
					self.streamer.url = data.stream.channel.url;
				}
				self.streamerData.push(self.streamer);
			});
		});
		// twitchDataService.lookUp(streamEndpoint).then(function(res){
		// 	console.log('stream data ', res);
		// 	res.forEach(function(data){
		// 		console.log(data);
		// 	});
		// }).then(function(){
		// 	twitchDataService.lookUp(channelEndpoint).then(function(res){
		// 		console.log('channel data ', res);
		// 		//console.log('should have full streamer object', res);
		// 	});
		// });


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

	twitchAppCtrl.$inject = ['$scope', '$q', 'twitchDataService', 'endpoint', 'streamers'];

	angular
		.module('twitchApp', [])
		.constant('endpoint', 'https://api.twitch.tv/kraken/')
		// .constant('streamEndpoint', 'https://api.twitch.tv/kraken/streams/')
		.constant('streamers', ['brunofin', 'comster404', 'freecodecamp', 'storbeck', 'terakilobyte', 'habathcx', 'RobotCaleb', 'thomasballinger', 'noobs2ninjas', 'beohoff', 'test_channel', 'cretetion', 'sheevergaming', 'TR7K', 'OgamingSC2', 'ESL_SC2'])
		.controller('twitchAppCtrl', twitchAppCtrl)
		.service('twitchDataService', twitchDataService);
})();

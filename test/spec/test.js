(function() {
  'use strict';

  describe('TwitchAPI Project Tests', function() {
    beforeEach(module('twitchApp'));

    let twitchAPICtrl,
      scope,
      streamers,
      endpoint;

    describe('Test twitchAPICtrl', function() {
      console.log('running test');
      beforeEach(inject(function($controller, $rootScope, _streamers_, _endpoint_) {
        scope = $rootScope.$new();
        twitchAPICtrl = $controller('twitchAPICtrl', {
          $scope: scope
        });
        streamers = _streamers_;
        endpoint = _endpoint_;
      }));
      it('should inject constants', function() {
        expect(streamers).toEqual(['brunofin', 'comster404', 'freecodecamp', 'storbeck', 'terakilobyte', 'habathcx', 'RobotCaleb', 'thomasballinger', 'noobs2ninjas', 'beohoff', 'test_channel', 'cretetion', 'sheevergaming', 'TR7K', 'OgamingSC2', 'ESL_SC2']);
      });
    });
  });
})();

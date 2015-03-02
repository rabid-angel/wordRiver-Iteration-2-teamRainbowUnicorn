'use strict';

angular.module('wordRiverSpaceshipParrotIteration1App')
  .controller('OverviewCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];

    $scope.contextPacks = [
      {pack: "heroPack"},
      {pack: "zoo"},
      {pack: "biomes"},
      {pack: "cars"},
      {pack: "disney"}
    ];

    $scope.textField = "";

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });

    $scope.addContextPacks = function () {
      if($scope.contextPacks.length >= 1) {
        $scope.contextPacks.push({pack: $scope.textField});
        $scope.textField = "";
      }
    };
  });

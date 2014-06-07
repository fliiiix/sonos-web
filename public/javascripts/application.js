app = angular.module("sonos", ["ngResource"]);

app.factory('Speakers', function($resource) {
  return $resource('/speakers/:id', {
    id: "@id"
  });
});

app.factory('Playlist', function($resource) {
  return $resource('/playlist/:id', {
    id: "@id"
  });
});

var speaker = undefined;


app.controller("AppCtrl", function($scope, Speakers, Playlist) {
  $scope.speakers = Speakers.query();
  $scope.playlist = [];
  $scope.showMenu = false;

  $scope.getPlaylist = function(id) {
    console.log(id);
    $scope.playlist = Playlist.get({id: id});
  }

  $scope.toggleMenu = function() {
    $scope.showMenu = !$scope.showMenu;
    console.log($scope.showMenu);
  }
});

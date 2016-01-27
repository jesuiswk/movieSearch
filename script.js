angular.module('movieApp', ['ngCookies'])
  .controller('MoviesController', ['$scope','$http','$cookies', function($scope, $http, $cookies) {
    var movieList = this;
    movieList.apiKey = "vymecugmgctsrxbbbmztpnb9";
    $http.jsonp("http://api.rottentomatoes.com/api/public/v1.0/lists/movies/upcoming.json?callback=JSON_CALLBACK",{params:{apikey:movieList.apiKey}})
    .success(function(data){
      $scope.movies = data.movies;
    })
    .error(function(data, status){
      $scope.status = status;
    });
    $scope.favoriteMovies = ($cookies.get("myFavorite")||"").split(',');
    $scope.predicate = 'title';
    $scope.reverse = true;
    $scope.minCriticsScore = -2;
    $scope.maxCriticsScore = 100;
    $scope.minAudienceScore = -2;
    $scope.maxAudienceScore = 100;
    $scope.ealiestReleaseDate = new Date();
    $scope.latestReleaseDate = new Date();
    $scope.latestReleaseDate = new Date($scope.latestReleaseDate.setDate($scope.latestReleaseDate.getDate()+30));
    $scope.selectedMovie = {};
    $scope.order = function(predicate) {
      $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
      $scope.predicate = predicate;
    };
    $scope.favorite = function(id) {
      if (angular.isArray($scope.favoriteMovies)) {
        if ($.inArray(id, $scope.favoriteMovies)===-1) {
          $scope.favoriteMovies.push(id); //add to favorite
        } else {
          var i = $scope.favoriteMovies.indexOf(id);
          $scope.favoriteMovies.splice(i, 1);
        }
      } else {
        $scope.favoriteMovies = [id];
      }
      $cookies.put('myFavorite', $scope.favoriteMovies);
    };
    $scope.loadMovie = function(movie) {
      $scope.selectedMovie = movie;
    };

    $scope.compareMinCriticsScore = function(val){
      return function(item){
        return item.ratings.critics_score > val;
      };
    };

    $scope.compareMaxCriticsScore = function(val){
      return function(item){
        return item.ratings.critics_score < val;
      };
    };

    $scope.compareMinAudienceScore = function(val){
      return function(item){
        return item.ratings.audience_score > val;
      };
    };

    $scope.compareMaxAudienceScore = function(val){
      return function(item){
        return item.ratings.audience_score < val;
      };
    };

    $scope.compareEarliestReleaseDate = function(val){
      return function(item){
        return new Date(item.release_dates.theater) >= val;
      };
    };

    $scope.compareLatestReleaseDate = function(val){
      return function(item){
        return new Date(item.release_dates.theater) <= val;
      };
    };

  }]);

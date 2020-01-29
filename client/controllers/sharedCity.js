app.controller("sharedCity", function($scope, $routeParams, $http, $location) {

    $scope.username = $routeParams.username;

    

    $http({
      method : "GET",
        url : `http://localhost:3000/users?firstName=${username}`
    }).then(function mySuccess(response) {
      $scope.sharedCities=response.data[0].shared;
    }, function myError(response) {
      $scope.myWelcome = response.statusText;
    });

  });
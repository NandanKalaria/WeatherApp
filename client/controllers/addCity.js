app.controller("addCity", function($scope, $routeParams, $http) {
    $scope.username = $routeParams.username;

    $scope.cityToAdd = null;


    $http({
      method : "GET",
        url : `https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=4726981a49612e861cd023fbe81eb99d`
    }).then(function mySuccess(response) {
      console.log(response);
    }, function myError(response) {
      $scope.myWelcome = response.statusText;
    });

  });
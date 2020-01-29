app.controller("dashboard", function($scope, $routeParams, $http) {
           
    $scope.username = $routeParams.username;

    console.log(username);

    $http({
      method : "GET",
        url : `http://localhost:3000/users?firstName=${username}`
    }).then(function mySuccess(response) {
      $scope.myCities=response.data[0].cities;
    }, function myError(response) {
      $scope.myWelcome = response.statusText;
    });

  });
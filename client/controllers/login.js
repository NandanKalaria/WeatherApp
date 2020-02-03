app.controller("myController", ["$scope", "$http", "$location", "$rootScope", "sessionService", function ($scope, $http, $location, $rootScope, sessionService) {

  $scope.fname = null;
  $scope.lname = null;
  $scope.eid = null;
  $scope.pwd = null;



  $scope.sharedCity = function () {
    $location.path('/users/' + username + '/sharedCities')
  };

  $scope.addCity = function () {
    $location.path('/users/' + username + '/addCity')
  };

  $scope.dashboard = function () {
    $location.path('/users/' + username)
  };



  $scope.adduser = function (fname, lname, eid, pwd) {

    var len = 0;

    console.log("SignUp Button Working");

    $http({
      method: "GET",
      url: `http://localhost:3000/users`
    }).then(function mySuccess(response) {
      console.log((response.data).length);

      var data = {

        id: ((response.data).length) + 1,
        fname: fname,
        lname: lname,
        eid: eid,
        pwd: pwd,
        cities: null,
        shared: null,



      };

      $http.post("http://localhost:3000/users", JSON.stringify(data))
        .then(function (response) {
          console.log(response);
        }, function (error) {
          console.log(error);

        })

    }, function myError(response) {
      $scope.users = response.statusText;
    });
  };

  $scope.email = null;
  $scope.password = null;
  $rootScope.username = null;



  $scope.loginUser = function (email, password) {


    $http({
      method: "GET",
      url: `http://localhost:3000/users?email=${email}`
    }).then(function mySuccess(response) {
      if (response.data[0].pwd == password) {

        username = response.data[0].firstName;
        console.log(username);

        $location.path('/users/' + username)

      } else {
        alert("User ID or Password Incorrect.")
      }

    }, function myError(response) {
      $scope.users = response.statusText;
    });
  };


}]);
app.controller("myController", ["$scope", "$http", "$location", "$rootScope", "$window",  function ($scope, $http, $location, $rootScope, $window) {

  $scope.fname = null;
  $scope.lname = null;
  $scope.eid = null;
  $scope.pwd = null;
  $scope.log= true;
  $rootScope.username = $window.sessionStorage.uname;




  $scope.sharedCity = function () {
    $location.path('/users/' + $window.sessionStorage.uname + '/sharedCities')
  };

  $scope.dashboard = function () {
    $location.path('/users/' + $window.sessionStorage.uname)
  };


  $scope.logout = function () {
    $window.sessionStorage.uname = "";
    username="";
    $location.path('/')
  }

  $scope.regStatus = null;

  $scope.adduser = function (fname, lname, eid, pwd) {

    if(fname == null || lname == null || eid == null || pwd == null){
      $scope.regStatus = "All fields are required";
    }

    else{

    var len = 0;

    console.log("SignUp Button Working");

    $http({
      method: "GET",
      url: `http://localhost:3000/users`
    }).then(function mySuccess(response) {
      console.log(response.data);

      var cities = [];
      var shared = [];

      var data = {

        id: ((response.data).length) + 1,
        firstName: fname,
        lastName: lname,
        email: eid,
        pwd: pwd,
        cities: cities,
        shared: shared,
      };

      $http.post("http://localhost:3000/users", JSON.stringify(data))
        .then(function (response) {
          console.log(response);
          $location.path('/')

        }, function (error) {
          console.log(error);

        })

    }, function myError(response) {
      $scope.users = response.statusText;
    });
  }
  };

  $scope.email = null;
  $scope.password = null;
  $rootScope.username = $window.sessionStorage.uname;
  $scope.logStatus = null;



  $scope.loginUser = function (email, password) {

    if(email==null || password==null){
      $scope.logStatus = "All fields required";
    }

    else{

    $http({
      method: "GET",
      url: `http://localhost:3000/users?email=${email}`
    }).then(function mySuccess(response) {

      console.log(response.data);
      if (response.data[0].pwd == password) {

        $window.sessionStorage.uname = response.data[0].firstName;

        $location.path('/users/' + $window.sessionStorage.uname)

      } else {
        $scope.logStatus = "User ID or password incorrect";
      }

    }, function myError(response) {
      $scope.users = response.statusText;
    });
  }
  };


}]);
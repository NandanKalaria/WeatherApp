app.controller("dashboard", function($scope, $location, $routeParams, $http, $timeout, $window) {
           
    $scope.username = $routeParams.username;

    if($window.sessionStorage.uname==''){
      $location.path('/');
    }

    if($window.sessionStorage.uname!==''){
      $location.path('/users/:username');
    }

    $scope.myCities = [];

    $http({
      method: "GET",
      url: `http://localhost:3000/users?firstName=${$window.sessionStorage.uname}`
    }).then(
      function mySuccess(response) {
        $scope.mine = response.data[0].cities;
        $scope.mine.forEach(element => {
          $http({
            method: "GET",
            url: `https://api.openweathermap.org/data/2.5/weather?q=${element}&appid=4726981a49612e861cd023fbe81eb99d`
          }).then(
            function mySuccess(response) {
              var City={name:"", icon:"", des:"", temp:"", min:"", max:""}
              City.name=response.data.name;
              City.icon=response.data.weather[0].main;
              City.des=response.data.weather[0].main;
              City.temp=parseInt(response.data.main.temp)-273;
              City.min=parseInt(response.data.main.temp_min)-273;
              City.max=parseInt(response.data.main.temp_max)-273;
            
              $scope.myCities.push(City);
  
              
            },
            function myError(response) {
              $scope.myWelcome = response.statusText;
            }
          );
        });
      },
      function myError(response) {
        $scope.myWelcome = response.statusText;
      }
    );


    
    
  });
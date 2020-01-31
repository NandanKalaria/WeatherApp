app.controller("dashboard", function($scope, $routeParams, $http, $timeout) {
           
    $scope.username = $routeParams.username;

    $scope.myCities = [];

    $http({
      method: "GET",
      url: `http://localhost:3000/users?firstName=${username}`
    }).then(
      function mySuccess(response) {
        $scope.mine = response.data[0].cities;
        $scope.mine.forEach(element => {
          $http({
            method: "GET",
            url: `https://api.openweathermap.org/data/2.5/weather?q=${element}&appid=4726981a49612e861cd023fbe81eb99d`
          }).then(
            function mySuccess(response) {
              var City={name:"", icon:"", temp:"", min:"", max:""}
              City.name=response.data.name;
              City.icon=response.data.weather[0].main;
              City.temp=response.data.main.temp;
              City.min=response.data.main.temp_min;
              City.max=response.data.main.temp_max;
            
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
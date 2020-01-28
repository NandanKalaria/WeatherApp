app.controller("myController", ["$scope", "$http", "$location", function ($scope, $http, $location){
                
    $scope.fname = null;
    $scope.lname = null;
    $scope.eid = null;
    $scope.pwd = null;
    $scope.loggedOut = true;

    $scope.sharedCity = function(){
      console.log("HI");
      alert('/users/' + username + '/sharedCities');
      $location.path('/users/' + username + '/sharedCities')
    };


    
    $scope.adduser = function (fname, lname, eid, pwd){

        console.log("SignUp Button Working");

        var data = {
            fname: fname,
            lname: lname,
            eid: eid,
            pwd: pwd

            
        };

        $http.post("http://localhost:3000/users", JSON.stringify(data))
        .then(function (response) {
            console.log(response);
            },function(error){
            console.log(error);

        })
    };

      $scope.email = null;
      $scope.password = null;

      $scope.loginUser = function(email, password){

      $http({
        method : "GET",
          url : `http://localhost:3000/users?email=${email}`
      }).then(function mySuccess(response) {
          if(response.data[0].pwd==password){
            
            loggedOut = false;

            $scope.username=response.data[0].firstName;

            $location.path('/users/' + response.data[0].firstName)

          }

          else{
              alert("User ID or Password Incorrect.")
          }
        
      }, function myError(response) {
        $scope.users = response.statusText;
      });  
    };

    
}]);
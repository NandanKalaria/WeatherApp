var app = angular
            .module("Weather",['ngRoute', 'ngMaterial'])
            .config(function ($routeProvider, $locationProvider){
                $routeProvider.caseInsensitiveMatch = true;

                $routeProvider

                .when("/", {
                    templateUrl: "client/views/login.html",
                    //controller: "loginController"
                })
                    .when("/register", {
                        templateUrl: "client/views/register.html",
                       // controller: "registerController"
                    })


                  .when('/users/:username', {
                    templateUrl: 'client/views/dashboard.html',
                    controller: 'userController'
                })

                .when("/users/:username/shared-cities", {
                  templateUrl: "client/views/shared-city.html",
                 // controller: "registerController"
              })

                  .otherwise({
                    redirectTo: "/"
                });

                    
            })

            .controller('Nav', function ($scope, $mdSidenav) {
                $scope.toggleLeft = buildToggler('left');
            
                function buildToggler(componentId) {
                  return function() {
                    $mdSidenav(componentId).toggle();
                  };
                }
              })

            .controller("myController", ["$scope", "$http", "$location", function ($scope, $http, $location){
                
                $scope.fname = null;
                $scope.lname = null;
                $scope.eid = null;
                $scope.pwd = null;
                
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
             
            $scope.sharedCity=function(){
              $location.path('/users/' + response.data[0].firstName + 'shared-cities')
            }

            app.controller("userController", function ($scope, $routeParams) {
              $scope.username = $routeParams.username;
          });
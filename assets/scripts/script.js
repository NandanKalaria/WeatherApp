var app = angular
            .module("Weather",["ngRoute"])
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
            })
            .controller("myController", ["$scope", "$http", function ($scope, $http){
                
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

                    $http.post("/data/db.json", JSON.stringify(data))
                    .then(function (response) {
                        console.log(response);
                        },function(error){
                        console.log(error);

                    })
                };


                $http({
                    method : "GET",
                      url : "/data/db.json"
                  }).then(function mySuccess(response) {
                    $scope.users = response.data;
                  }, function myError(response) {
                    $scope.users = response.statusText;
                  });  

                  console.log("Get Method Working");
            }]);
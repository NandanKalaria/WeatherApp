app.controller("myController", [
  "$scope",
  "$http",
  "$location",
  "$rootScope",
  "$window",
  function($scope, $http, $location, $rootScope, $window) {
    $scope.fname = null;
    $scope.lname = null;
    $scope.eid = null;
    $scope.pwd = null;
    $scope.log = true;
    $rootScope.username = $window.sessionStorage.uname;

    $scope.sharedCity = function() {
      $location.path(
        "/users/" + $window.sessionStorage.uname + "/sharedCities"
      );
    };

    $scope.dashboard = function() {
      $location.path("/users/" + $window.sessionStorage.uname);
    };

    $scope.logout = function() {
      $window.sessionStorage.uname = "";
      username = "";
      $location.path("/");
    };

    $scope.regStatus = null;

    $scope.formEmpty = function(){
      if ($scope.email == null || $scope.password == null) {
        $scope.logStatus = "All fields required";
      }
    }

    $scope.adduser = function(fname, lname, eid, pwd) {
      $http({
        method: "GET",
        url: `http://localhost:3000/emails`
      }).then(
        function mySuccess(response) {
          var emails = response.data;

          if (fname == null || lname == null || eid == null || pwd == null) {
            $scope.regStatus = "All fields are required";
          } else if (emails.includes(eid)) {
            $scope.regStatus = "User with this email id already exists.";
          } else {
            var len = 0;

            $http({
              method: "GET",
              url: `http://localhost:3000/users`
            }).then(
              function mySuccess(response) {
                console.log(response.data);

                var cities = [];
                var shared = [];

                var data = {
                  id: response.data.length + 1,
                  firstName: fname,
                  lastName: lname,
                  email: eid,
                  pwd: pwd,
                  cities: cities,
                  shared: shared
                };

                $http
                  .post("http://localhost:3000/users", JSON.stringify(data))
                  .then(
                    function(response) {
                      console.log(response);

                      $http.get(`http://localhost:3000/emails`).then(
                        function(response) {
                          console.log("get", response.data);

                          var id = response.data[0].id;
                          var mail_arr = response.data[0].emails;
                          mail_arr.push(eid);
                          console.log("updated", mail_arr, typeof mail_arr);
                          var mail={
                            id: id,
                            emails: mail_arr
                          }
                          $http
                            .put(
                              `http://localhost:3000/emails/1`,
                              JSON.stringify(mail)
                            )
                            .then(
                              function(response) {
                                console.log("response", response);
                              },
                              function(error) {
                                console.log("error", error);
                              }
                            );
                        },
                        function(error) {
                          console.log("main error", error);
                        }
                      );

                      $http.get(`http://localhost:3000/usernames`).then(
                        function(response) {
                          console.log(response.data);

                          var id = response.data[0].id;
                          var username_arr = response.data[0].names;
                          username_arr.push(fname);

                          var nameData={
                            id: id,
                            names: username_arr
                          }

                          $http
                            .put(
                              `http://localhost:3000/usernames/1`,
                              JSON.stringify(nameData)
                            )
                            .then(
                              function(response) {
                                console.log(response);
                              },
                              function(error) {
                                console.log(error);
                              }
                            );
                        },
                        function(error) {
                          console.log(error);
                        }
                      );

                      $location.path("/");
                    },
                    function(error) {
                      console.log(error);
                    }
                  );
              },
              function myError(response) {
                $scope.users = response.statusText;
              }
            );
          }
          console.log(emails.includes(eid));
        },
        function myError(response) {
          $scope.myWelcome = response.statusText;
        }
      );
    };

    $scope.email = null;
    $scope.password = null;
    $rootScope.username = $window.sessionStorage.uname;
    $scope.logStatus = null;

    $scope.loginUser = function(email, password) {
      if (email == null || password == null) {
        $scope.logStatus = "All fields required";
      } else {
        $http({
          method: "GET",
          url: `http://localhost:3000/users?email=${email}`
        }).then(
          function mySuccess(response) {
            console.log(response.data);
            if (response.data[0].pwd == password) {
              $window.sessionStorage.uname = response.data[0].firstName;

              $location.path("/users/" + $window.sessionStorage.uname);
            } else {
              $scope.logStatus = "User ID or password incorrect";
            }
          },
          function myError(response) {
            $scope.users = response.statusText;
          }
        );
      }
    };
  }
]);

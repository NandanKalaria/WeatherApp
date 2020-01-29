var app = angular
  .module("Weather", ["ngRoute", "ngMaterial"])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider.caseInsensitiveMatch = true;

    $routeProvider

      .when("/", {
        templateUrl: "client/views/login.html"
        //controller: "loginController"
      })
      .when("/register", {
        templateUrl: "client/views/register.html"
        // controller: "registerController"
      })

      .when("/register", {
        templateUrl: "client/views/register.html"
        // controller: "registerController"
      })

      .when("/register", {
        templateUrl: "client/views/register.html"
        // controller: "registerController"
      })

      .when("/users/:username", {
        templateUrl: "client/views/dashboard.html",
        controller: "dashboard"
      })

      .when("/users/:username/sharedCities", {
        templateUrl: "client/views/shared-city.html",
        controller: "sharedCity"
      })

      .otherwise({
        redirectTo: "/"
      });
  });



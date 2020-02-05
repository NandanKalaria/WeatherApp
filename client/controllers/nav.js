app.controller('Nav', function ($scope, $mdSidenav, $window, $rootScope, $interval) {

    
    $scope.toggleLeft = buildToggler('left');

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      };
    }

    $interval(function() {
      $scope.loggedOut = false;
      $scope.greeting = $window.sessionStorage.uname;

      if($window.sessionStorage.uname==''){
      $scope.loggedOut = true;
     }
      },10);
  })
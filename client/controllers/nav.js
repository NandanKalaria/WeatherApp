app.controller('Nav', function ($scope, $mdSidenav, $window, $rootScope) {


    $scope.toggleLeft = buildToggler('left');

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      };
    }
  })
(function () {
  'use strict';
  
      app.controller('DemoCtrl', DemoCtrl);

  function DemoCtrl($mdDialog) {
    var self = this;

    self.openDialog = function($event) {
      $mdDialog.show({
        controller: DialogCtrl,
        controllerAs: 'ctrl',
        templateUrl: '/client/views/share-pop.html',
        parent: angular.element(document.body),
        targetEvent: $event,
        clickOutsideToClose:true
      });
    };
  }

  function DialogCtrl ($timeout, $q, $scope, $mdDialog, $http) {


    var self = this;


    // list of `state` value/display objects
    self.states        = loadAll();
    self.querySearch   = querySearch;

    // ******************************
    // Template methods
    // ******************************

    self.cancel = function($event) {
      $mdDialog.cancel();
    };
    self.finish = function($event) {
      $mdDialog.hide();
    };

    // ******************************
    // Internal methods
    // ******************************

    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch (query) {
      return query ? self.states.filter(createFilterFor(query)) : self.states;
    }

    /**
     * Build `states` list of key/value pairs
     */
    function loadAll() {
      var allStates = 'Dubai, London, Bangkok, Paris, Singapore, New York, Honk Kong, Barcelona, Bali, Istanbul, Phuket, Qatar,\
      Vadodara, Boston, Chennai, Delhi, Kolkata, Tokyo, Rome, Berlin, Amsterdam, Surat, Madrid, Sydney, Venice';

      return allStates.split(/, +/g).map(function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = query.toLowerCase();

      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      };

    }
  }
})();


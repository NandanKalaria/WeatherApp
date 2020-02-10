(function () {
  'use strict';

  app.controller('AddCtrl', DemoCtrl);

  function DemoCtrl($mdDialog) {
    var self = this;

    self.openDialog = function ($event) {
      $mdDialog.show({
        controller: DialogCtrl,
        controllerAs: 'ctrl',
        templateUrl: '/client/views/add-city.html',
        parent: angular.element(document.body),
        targetEvent: $event,
        clickOutsideToClose: true
      });
    };
  }

  function DialogCtrl($timeout, $q, $scope, $mdDialog, $http, $window) {


    var self = this;


    // list of `state` value/display objects
    self.states = loadAll();
    self.querySearch = querySearch;

    // ******************************
    // Template methods
    // ******************************

    self.cancel = function ($event) {
      $mdDialog.cancel();
    };
    self.finish = function ($event, city) {

      $http.get(`http://localhost:3000/users?firstName=${$window.sessionStorage.uname}`)
        .then(function (response) {
          var cityArr = response.data[0].cities;
          
          if(cityArr.includes(city)){
            alert("Already exists");
          }

          else{
            console.log(cityArr);
          cityArr.push(city);
          console.log(cityArr);

          var fname = response.data[0].firstName;
          var lname = response.data[0].lastName;
          var eid = response.data[0].email;
          var pwd = response.data[0].pwd;
          var cities = cityArr;
          var shared = response.data[0].shared;
          var id = response.data[0].id;
          console.log(id);

          var data = {
            firstName: fname,
            lastName: lname,
            email: eid,
            pwd: pwd,
            cities: cities,
            shared: shared
          }



          $http.put(`http://localhost:3000/users/${id}`, JSON.stringify(data))
            .then(function (response) {
              console.log(response);
            }, function (error) {
              console.log(error);

            })
        }

          }

          , function (error) {
          console.log(error);

        })

      $mdDialog.hide();
    };

    // ******************************
    // Internal methods
    // ******************************

    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch(query) {
      return query ? self.states.filter(createFilterFor(query)) : self.states;
    }

    /**
     * Build `states` list of key/value pairs
     */
    function loadAll() {
      var allStates = 'Auckland, Dubai, Melbourne, Perth, Seattle, Shanghai, London, Beijing, Bangkok, Paris, Singapore, New York, Honk Kong, Barcelona, Bali, Istanbul, Phuket, Qatar,\
      Vadodara, Boston, Chennai, Toronto, Brisbane, Brussels, Chicago, Cairo, Jakarta, Delhi, Kolkata, Tokyo, Rome, Berlin, Amsterdam, Surat, Madrid, Sydney, Venice';

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
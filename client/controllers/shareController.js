(function () {
  'use strict';

  app.controller('DemoCtrl', DemoCtrl);

  var cityToAdd;

  function DemoCtrl($mdDialog) {
    var self = this;

    self.openDialog = function ($event, cityName) {
      cityToAdd = cityName;
      console.log(cityToAdd);
      $mdDialog.show({
        controller: DialogCtrl,
        controllerAs: 'ctrl',
        templateUrl: '/client/views/share-pop.html',
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
    self.finish = function ($event, user) {

      if(user==$window.sessionStorage.uname){
        $scope.shareStatus="Can't share city with your own self. Select other user.";
      }

      else{
        $http.get(`http://localhost:3000/users?firstName=${user}`)
        .then(function (response) {
          var cityArr = response.data[0].shared;
          console.log(cityArr);
          cityArr.push(cityToAdd);
          console.log(cityArr);

          var fname = response.data[0].firstName;
          var lname = response.data[0].lastName;
          var eid = response.data[0].email;
          var pwd = response.data[0].pwd;
          var cities = response.data[0].cities;
          var shared = cityArr;
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
              $scope.shareStatus=`City shared with ${user}`;
            }, function (error) {
              console.log(error);

            })
        }, function (error) {
          console.log(error);

        })
      }

      

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
      
      var names = "Nandan, Tony, Bruce, Steve, Pepper, Clark, Janki, Varsha, Kirti";
      var allStates = names;

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
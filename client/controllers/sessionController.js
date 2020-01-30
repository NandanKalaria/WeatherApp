app.controller('sessionController', [ 'sessionService',

       function (sessionService) {
          var vm = this;
       },

       function sessionController(sessionService) {
        var vm = this;

        vm.getServiceSession = function () {

            vm.model = {
                email: sessionService.get('email'),
                status: 'Retrieved by service on ' + new Date()
            };
        }

        vm.setServiceSession = function() { 

            sessionService.save('email', vm.model.email);
            vm.getServiceSession();
        
        
        }

        vm.clearServiceSession = function() { 

            sessionService.clear();
            vm.getServiceSession();
        }
    }

    ]);
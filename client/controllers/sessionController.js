app.controller('sessionController', [ 'sessionService',

       function sessionController(sessionService) {
        var vm = this;
        
        vm.getServiceSession = function () {

            vm = {
                mail: sessionService.get('mail'),
                status: 'Retrieved by service on ' + new Date()
            };
        }

        vm.setServiceSession = function() { 

            sessionService.save('mail', vm.mail);
            vm.getServiceSession();
        
        
        }

        vm.clearServiceSession = function() { 

            sessionService.clear();
            vm.getServiceSession();
        }
    }

    ]);
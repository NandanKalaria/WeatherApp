app.controller('vrepeatController', vrepeatController);
           
         function vrepeatController ($scope) { 
            this.items = [];
            for (var i = 0; i < 1000; i++) {
               this.items.push(i);
            }
         }	  

         
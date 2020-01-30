app.service('sessionService', ['$window', sessionService]);
    function sessionService($window) {

        this.save = save;

    function save(key, value) {

        $window.sessionStorage.setItem(key, value);
    }
    function get(key, value) {

        return $window.sessionStorage.getItem(key);
    } 

    function clear() { 

        $window.sessionStorage.clear();
    }

    }
(function() {
  'use strict';
  angular.module('app').component('login', {
    templateUrl: 'components/login/login.template.html',
    controller: controller
  });

  function controller($http, $state) {

    this.attempt = () => {
      $http({
        method: 'POST',
        url: '/api/login',
        data: this.user
      }).then(this.success, this.fail);
    }
    
    this.success = (response) => {
      $state.go('notebook');
    }

    this.fail = (response) => {
      delete this.user;
      console.log(response);
    }

  }
})();

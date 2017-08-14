(function() {
  'use strict';
  angular.module('app').component('app', {
    templateUrl: 'components/app/app.template.html',
    controller: controller
  });

  function controller($http) {
    this.$onInit = () => {
      $http({
        method: 'GET',
        url: '/api/init'
      }).then(success => {
        this.authenticated = true;
        console.log(success);
      }, failure => {
        this.authenticated = false;
        console.log(failure);
      });
    }
  }
})();

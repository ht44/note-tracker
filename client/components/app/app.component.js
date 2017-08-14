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
        console.log(success.data);
        this.authenticated = true;
        this.username = success.data.username;
        this.id = success.data.id;
        console.log(this.username);
        console.log(success);
      }, failure => {
        this.authenticated = false;
        console.log(failure);
      });
    }
  }
})();

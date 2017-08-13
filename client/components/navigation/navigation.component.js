(function() {
  'use strict';
  angular.module('app').component('navigation', {
    templateUrl: 'components/navigation/navigation.template.html',
    controller: controller
  });

  function controller($http, $state) {

    this.logout = () => {
      $http({
        method: 'GET',
        url: '/api/logout'
      }).then(this.success, this.failure);
    }

    this.success = response => {
      $state.go('home')
    }

    this.failure = response => {
      console.log(response);
    }

  }
})();

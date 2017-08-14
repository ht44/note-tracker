(function() {
  'use strict';
  angular.module('app').component('navigation', {
    templateUrl: 'components/navigation/navigation.template.html',
    bindings: {
      authenticated: '='
    },
    controller: controller
  });

  function controller($http, $state, $scope) {
    this.logout = () => {
      $http({
        method: 'GET',
        url: '/api/logout'
      }).then(this.success, this.failure);
    }

    this.success = response => {
      this.authenticated = false;
      $state.go('home');
    }

    this.failure = response => {
      console.log(response);
    }

  }
})();

(function() {
  'use strict';
  angular.module('app').component('navigation', {
    templateUrl: 'components/navigation/navigation.template.html',
    bindings: {
      authenticated: '='
    },
    controller: controller
  });

  function controller($http, $state, $scope, $window) {

    this.$onInit = () => {
      this.authenticated = $window.localStorage['userId'];
    };

    this.logout = () => {
      $http({
        method: 'GET',
        url: '/api/logout'
      }).then(success => {
        this.authenticated = false;
        $window.localStorage['authenticated'] = false;
        delete $window.localStorage['userId'];
        delete $window.localStorage['username'];
        $state.go('home', {}, {reload: true});
      }, failure => {
        $state.go('error', {message: failure});
      });
    };

    this.getAccount = () => {
      $state.go('users', {id: $window.localStorage['userId']});
    };

  }

})();

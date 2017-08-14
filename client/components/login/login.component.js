(function() {
  'use strict';
  angular.module('app').component('login', {
    templateUrl: 'components/login/login.template.html',
    controller: controller
  });

  function controller($http, $state, $scope, $window) {

    this.attempt = () => {
      $http({
        method: 'POST',
        url: '/api/login',
        data: this.user
      }).then(success => {
        $window.localStorage['userId'] = success.data.id;
        $window.localStorage['username'] = success.data.username;
        $scope.$parent.$ctrl.authenticated = true;
        $state.go('notebook');
      }, failure => {
        delete this.user;
        $state.go('error', {message: failure});
      });
    }
  }
})();

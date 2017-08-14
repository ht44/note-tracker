(function() {
  'use strict';
  angular.module('app').component('register', {
    templateUrl: 'components/register/register.template.html',
    controller: controller
  });

  function controller($http, $state, $scope, $window) {

    this.attempt = () => {
      $http({
        method: 'POST',
        url: '/api/register',
        data: this.user
      }).then(success => {
        $window.localStorage['username'] = success.data.username;
        $window.localStorage['userId'] = success.data.id;
        $scope.$parent.$ctrl.authenticated = true;
        $state.go('notebook');
      }, failure => {
        delete this.user;
        $state.go('error', {message: failure});
      });
    };

  }

})();

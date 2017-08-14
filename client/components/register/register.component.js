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
      }).then(this.success, this.fail);
    }

    this.success = (response) => {
      $window.localStorage['username'] = response.data.username;
      $window.localStorage['userId'] = response.data.id;
      $scope.$parent.$ctrl.authenticated = true;
      // $scope.$parent.$ctrl.id = response.data.id;
      // $scope.$parent.$ctrl.username = response.data.username;
      $state.go('notebook');
    }
    this.fail = (response) => {
      delete this.user;
      console.log(response);
    }
  }
})();

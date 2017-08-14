(function() {
  'use strict';
  angular.module('app').component('register', {
    templateUrl: 'components/register/register.template.html',
    controller: controller
  });

  function controller($http, $state, $scope) {

    this.attempt = () => {
      $http({
        method: 'POST',
        url: '/api/register',
        data: this.user
      }).then(this.success, this.fail);
    }

    this.success = (response) => {
      $scope.$parent.$ctrl.authenticated = true;
      $state.go('notebook');
    }
    this.fail = (response) => {
      delete this.user;
      console.log(response);
    }
  }
})();

(function() {
  'use strict';
  angular.module('app').component('account', {
    templateUrl: 'components/account/account.template.html',
    controller: controller
  });

  function controller($http, $state, $scope, $stateParams) {

    this.$onInit = () => {
      console.log('initted');
    }

    this.submit = () => {
      $http({
        method: 'PUT',
        url: `/api/users/${$stateParams.id}`,
        data: this.user
      }).then(success => {
        $scope.$parent.$ctrl.username = success.data.user.username;
        $scope.$parent.$ctrl.id = success.data.user._id;
        $state.go('home');
      }, failure => {
        $state.go('error', {message: failure});
      });
    }

    this.delete = () => {
      $http({
        method: 'DELETE',
        url: `/api/users/${$stateParams.id}`
      }).then(success => {
        $http({
          method: 'GET',
          url: '/api/logout'
        }).then(success => {
          $scope.$parent.$ctrl.authenticated = false;
          console.log($scope.$parent.$ctrl);
          $state.go('home');
        }, failure => {
          $state.go('error', {message: failure});
        });
      }, failure => {
        console.log(failure);
      });
    }
  }

})();

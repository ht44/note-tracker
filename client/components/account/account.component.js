(function() {
  'use strict';
  angular.module('app').component('account', {
    templateUrl: 'components/account/account.template.html',
    controller: controller
  });

  function controller($http, $state, $scope, $stateParams, $window) {

    this.$onInit = () => {
      this.authenticated = false;
      $http({
        method: 'GET',
        url: '/api/init'
      }).then(success => {
        this.authenticated = true;
        console.log(success);
      }, failure => {
        $state.go('error', {message: failure});
      })
    }

    this.submit = () => {
      $http({
        method: 'PUT',
        url: `/api/users/${$window.localStorage['userId']}`,
        data: this.user
      }).then(success => {
        $window.localStorage['username'] = success.data.user.username;
        $state.go('home', {}, {reload: true});
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
          delete $Window.localStorage['userId'];
          delete $Window.localStorage['username'];
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

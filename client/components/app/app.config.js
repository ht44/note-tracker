(function() {
  'use strict';
  angular.module('app').config(config);

  config.$inject = [
    '$stateProvider', '$locationProvider'
  ];

  function config($stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
    .state({
      name: 'app',
      abstract: true,
      component: 'app'
    })
    .state({
      name: 'register',
      parent: 'app',
      url: '/register',
      component: 'register'
    })
    .state({
      name: 'login',
      parent: 'app',
      url: '/login',
      component: 'login'
    })
    .state({
      name: 'users',
      parent: 'app',
      url: '/users/:id',
      component: 'account'
    })
    .state({
      name: 'notebook',
      parent: 'app',
      url: '/notebook',
      component: 'notebook'
    })
    .state({
      name: 'editor',
      parent: 'notebook',
      url: '/:id',
      component: 'editor',
      params: {
        note: null
      }
    })
    .state({
      name: 'home',
      parent: 'app',
      url: '/',
      component: 'landing'
    })
    .state({
      name: 'error',
      parent: 'app',
      url: '/',
      component: 'error',
      params: {
        message: null
      }
    })

  }

})();

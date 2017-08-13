(function() {
  'use strict';
  angular.module('app').config(config);

  config.$inject = [
    '$stateProvider', '$urlRouterProvider', '$locationProvider'
  ];

  function config($stateProvider, $urlRouterProvider, $locationProvider) {
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
      name: 'notebook',
      parent: 'app',
      url: '/notebook',
      component: 'notebook'
    })
    .state({
      name: 'home',
      parent: 'app',
      url: '/',
      component: 'landing'
    })

  }

})();

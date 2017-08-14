(function() {
  'use strict';
  angular.module('app').component('landing', {
    templateUrl: 'components/landing/landing.template.html',
    controller: controller
  });

  function controller($window) {
    this.$onInit = () => {
      this.username = $window.localStorage['username'];
    }
  }
})();

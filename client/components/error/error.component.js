(function() {
  'use strict';
  angular.module('app').component('error', {
    templateUrl: 'components/error/error.template.html',
    controller: controller
  });

  function controller($stateParams) {
    this.$onInit = () => {
      this.message = $stateParams.message.data;
    }
  }
})();

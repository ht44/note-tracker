(function() {
  'use strict';
  angular.module('app').component('notebook', {
    templateUrl: 'components/notebook/notebook.template.html',
    controller: controller
  });

  function controller($http) {

    // this.$onInit = () => {
    //   $http({
    //     method: 'GET',
    //     url: '/api/notebook'
    //   }).then(this.success, this.failure)
    // }

    this.success = (response) => {
      console.log(response);
    }

    this.failure = (response) => {
      console.log(response);
    }
  }

})();

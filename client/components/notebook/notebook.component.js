(function() {
  'use strict';
  angular.module('app').component('notebook', {
    templateUrl: 'components/notebook/notebook.template.html',
    controller: controller
  });

  function controller($http) {


    this.$onInit = () => {
      this.notes = [];
      $http({
        method: 'GET',
        url: '/api/notebook'
      }).then(this.success, this.failure);
    }

    this.success = (response) => {
      this.notes = response.data.notes;
    }

    this.failure = (response) => {
      console.log(response);
    }

    this.createNote = () => {
      this.new.date = new Date().toISOString();

      $http({
        method: 'POST',
        url: '/api/notebook',
        data: this.new
      }).then(response => {
        this.notes.push(response.data.note);
        console.log(response);
      }, response => {
        console.log(response);
      });

    }

    this.editNote = () => {
      console.log(this.edit);
    }
  }

})();

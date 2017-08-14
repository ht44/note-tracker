(function() {
  'use strict';
  angular.module('app').component('notebook', {
    templateUrl: 'components/notebook/notebook.template.html',
    controller: controller
  });

  function controller($http, $state) {

    this.$onInit = () => {
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

    this.selectNote = (note) => {
      this.current = note;
      $state.go('editor', {id: note._id, note: this.current});
    }

    this.createNote = () => {
      this.new.date = new Date().toISOString();

      $http({
        method: 'POST',
        url: '/api/notebook',
        data: this.new
      }).then(success => {
        this.notes.push(success.data.note);
        this.edit = success.data.note;
      }, failure => {
        console.log(failure);
      });

    }

    this.editNote = () => {
      console.log(this.edit);
    }
  }

})();

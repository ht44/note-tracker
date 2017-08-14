(function() {
  'use strict';
  angular.module('app').component('notebook', {
    templateUrl: 'components/notebook/notebook.template.html',
    controller: controller
  });

  function controller($http, $state, $window) {

    this.$onInit = () => {
      $http({
        method: 'GET',
        url: '/api/notebook'
      }).then(success => {
        this.authenticated = true;
        this.notes = success.data.notes;
      }, failure => {
        $state.go('error', {message: failure});
      });
    }

    this.selectNote = (note) => {
      this.current = note;
      $state.go('editor', {id: note._id, note: this.current});
    }

    this.createNote = () => {
      this.new.created = new Date().toISOString();
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

  }

})();

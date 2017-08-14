(function() {
  'use strict';
  angular.module('app').component('editor', {
    templateUrl: 'components/editor/editor.template.html',
    bindings: {
      note: '='
    },
    controller: controller
  });

  function controller($http, $stateParams, $state, $scope) {

    this.$onInit = () => {
      if (!$stateParams.note) {
        $state.go('notebook');
      }
    }

    this.editNote = () => {
      console.log($stateParams);
      $http({
        method: 'PUT',
        url: `/api/notebook/${this.note._id}`,
        data: {
          title: this.note.title,
          body: this.note.body,
          edited: new Date().toISOString()
        }
      }).then(success => {
        console.log(success);
      }, failure => {
        console.log(failure);
      });
    }

    this.deleteNote = () => {
      $http({
        method: 'DELETE',
        url: `/api/notebook/${this.note._id}`
      }).then(success => {
        const idx = $scope.$parent.$ctrl.notes.indexOf(this.note);
        $scope.$parent.$ctrl.notes.splice(idx, 1);
        this.note = $scope.$parent.$ctrl.notes[0];
      }, failure => {
        console.log(failure);
      });
    }
  }
})();

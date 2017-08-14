(function() {
  'use strict';
  angular.module('app').component('editor', {
    templateUrl: 'components/editor/editor.template.html',
    bindings: {
      note: '='
    },
    controller: controller
  });

  function controller($http, $stateParams, $scope) {

    this.editNote = () => {
      $http({
        method: 'PUT',
        url: `/api/notebook/${this.note._id}`,
        data: {title: this.note.title, body: this.note.body}
      }).then(success => {
        console.log(success);
      }, failure => {
        console.log(failure);
      });
    }
  }
})();

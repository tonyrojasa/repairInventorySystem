(function () {
  'use strict';

  angular
    .module('items.admin')
    .directive('repairs', repairs);

  repairs.$inject = ['TechniciansService'];

  function repairs(TechniciansService) {
    return {
      templateUrl: '/modules/items/client/views/admin/repairs.client.view.html',
      restrict: 'E',
      replace: true,
      scope: {
        resolutions: '=',
        form: '=',
        readonly: '@',
        showLabels: '=',
        isTechnician: '='
      },
      link: function postLink(scope, element, attrs) {
        scope.technicians = TechniciansService.query();

        scope.addResolution = function () {
          if (!scope.resolutions) {
            scope.resolutions = [];
          }

          scope.resolutions.push({
            resolutionDate: '',
            condition: '',
            observations: '',
            cost: '',
            technician: '',
            creationDate: new Date(),
            date: scope.isTechnician ? new Date() : ''
          });
        };
        scope.conditions = [
          'Ingresado (en revisión)',
          'En reparación',
          'Reparado',
          'No se puede reparar',
          'Pendiente de repuestos',
          'No hay repuestos',
          'Otro'
        ];

        scope.removeResolution = function (index) {
          scope.resolutions.splice(index, 1);
        };

      }
    };
  }
}());

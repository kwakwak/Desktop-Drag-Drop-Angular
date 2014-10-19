(function () {
  'use strict';
  function MainController(scope, localForage) {
    var vm = this;
    vm.status = {
      loading: true
    };
    localForage.getItem('gallery').then(function (data) {
      if (data) {
        vm.gallery = data;
      } else {
        vm.gallery = [];
      }
      vm.status.loading = false;
    });
    vm.remove = function (index) {
      vm.gallery.splice(index, 1);
      localForage.setItem('gallery', vm.gallery);
    };
    scope.$on('imageAdd', function () {
      localForage.setItem('gallery', vm.gallery);
    });
  }
  angular.module('dragAndDrop', ['LocalForageModule'])
      .controller('MainController', ['$scope', '$localForage', MainController])
      .directive('droppableArea', function () {
      return {
        restrict: 'A', //attribute only
        scope: {
          gallery: '='
        },
        link: function (scope, elem) {
          function parse(img) {
            if (img.type.indexOf("image") === 0) {
              var reader = new FileReader();
              reader.onload = function (e) {
                scope.gallery.push(e.target.result);
                scope.$emit('imageAdd');
                scope.$apply();
              };
              reader.readAsDataURL(img);
            }
          }
          elem.bind('drop', function (ev) {
            ev.stopPropagation();
            ev.preventDefault();
            var files = ev.target.files || ev.dataTransfer.files;
            angular.forEach(files, function (f) {
              parse(f);
            });
          });
          elem.bind('dragover', function (ev) {
            ev.stopPropagation();
            ev.preventDefault();
          });
          elem.bind('dragleave', function (ev) {
            ev.stopPropagation();
            ev.preventDefault();
          });
        }
      };
    });
}());

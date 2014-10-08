(function () {
    function MainController(){
        var vm=this;
        vm.gallery =[];
    }
    angular.module('dragAndDrop',[])
        .controller({
            MainController:MainController
        })
        .directive('droppableArea', function() {
            return {
                restrict: 'A', //attribute only
                scope: {
                    gallery:'='
                },
                link: function(scope, elem, attr, ctrl) {
                    function parse(img){
                        if (img.type.indexOf("image") == 0) {
                            var reader = new FileReader();
                            reader.onload = function(e) {
                                scope.gallery.push(e.target.result);
                                scope.$apply();
                            }
                            reader.readAsDataURL(img);
                        }
                    }
                    elem.bind('drop', function(ev) {
                        ev.stopPropagation();
                        ev.preventDefault()

                        var files = ev.target.files || ev.dataTransfer.files;
                        for (var i = 0, f; f = files[i]; i++) {
                            parse(f);
                        }
                    });
                    elem.bind('dragover', function(ev) {
                        ev.stopPropagation();
                        ev.preventDefault();;
                    });
                    elem.bind('dragleave', function(ev) {
                        ev.stopPropagation();
                        ev.preventDefault();;
                    });

                }
            };
        });
}());

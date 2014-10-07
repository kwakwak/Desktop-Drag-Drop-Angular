(function () {
    function MainController(){
        var vm=this;
        vm.hello ='roni';
    }
    angular.module('dragAndDrop',[])
        .controller({
            MainController:MainController
        })
        .directive('droppableArea', function() {
            return {
                restrict: 'A', //attribute only
                scope: true,
                link: function(scope, elem, attr, ctrl) {
                    scope.dropped=false;
                    elem.bind('drop', function(ev) {
                        ev.preventDefault();
                        var data = ev.dataTransfer.getData("text/html");
                        ev.target.appendChild(document.getElementById(data));
                        if (data === elem[0].id){
                            scope.correct=true;
                            scope.dropped=true;
                            scope.$digest();
                        } else {
                            scope.correct=false;
                            scope.dropped=true;
                            scope.$digest();
                        }

                    });
                    elem.bind('dragover', function(ev) {
                        ev.preventDefault();
                    });
                }
            };
        })
        .directive('draggableThing', function(){
            return {
                restrict: 'A', //attribute only
                link: function(scope, elem, attr, ctrl) {
                    elem.bind('dragstart', function(ev) {
                        ev.dataTransfer.setData("text/html", ev.target.id);
                    });
                }
            };
        });
}());

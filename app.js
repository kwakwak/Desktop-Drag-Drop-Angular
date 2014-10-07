function MainController(){
    var vm=this;
    vm.hello ='roni';
}

angular.module('dragAndDrop',[])
    .controller({
        MainController:MainController
    })



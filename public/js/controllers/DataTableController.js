app.controller('DataTableController', function($scope, $uibModal) {
    var $ctrl = this;
    $ctrl.$onInit = function() {
        $ctrl.dataservice.get()
        .then(
            function successCallback(response) {
                $ctrl.dataitems = response;
            },
        )
    }
    $scope.$watch('$ctrl.refreshsignal',function(){
        $ctrl.dataservice.get()
            .then(
                function successCallback(response) {
                    $ctrl.dataitems = response;
                },
            )
    })
})
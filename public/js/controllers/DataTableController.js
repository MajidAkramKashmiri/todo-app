app.controller('DataTableController', function($scope, $uibModal) {
    var $ctrl = this;
    $ctrl.$onInit = function() {
        console.log($ctrl.pagenumber);
        $ctrl.dataservice.get($ctrl.pagenumber)
        .then(
            function successCallback(response) {
                console.log($ctrl.pagenumber);
                $ctrl.dataitems = response.docs;
            },
        )
    }
    $scope.$watch('$ctrl.refreshsignal',function(){
        $ctrl.dataservice.get($ctrl.pagenumber)
            .then(
                function successCallback(response) {
                    $ctrl.dataitems = response.docs;
                },
            )
    })
})
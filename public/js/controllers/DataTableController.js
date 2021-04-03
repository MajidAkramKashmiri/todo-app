app.controller('DataTableController', function($scope, $uibModal) {
    var $ctrl = this;
    $ctrl.$onInit = function() {
        $scope.currentPage = 0;
        $scope.isDisable = 0;
        $scope.pageNbrs = [1, 2];
        $ctrl.dataservice.get($scope.currentPage)
            .then(
                function successCallback(response) {
                    $scope.totalPages = response.pagination.pages;
                    $scope.totalEntries = response.pagination.total;
                    $ctrl.dataitems = response.dataitems;
                },
            )
    }
    $scope.gotoPage=function(pageNbr){
        $scope.currentPage = pageNbr;
        if ($scope.currentPage != $scope.totalPages - 1 && $scope.currentPage != 0) {
            $scope.isDisable = 0;
            $scope.pageNbrs.splice(0, $scope.pageNbrs.length, $scope.currentPage, $scope.currentPage + 1, $scope.currentPage + 2);
        }
        else
            {
                if ( $scope.currentPage == $scope.totalPages - 1 ) {
                    $scope.isDisable = 1;
                    $scope.pageNbrs.splice(0, $scope.pageNbrs.length, $scope.currentPage, $scope.currentPage + 1);
                }
                else 
                    {
                        if ( $scope.currentPage == 0 )
                        {                             
                            $scope.isDisable=0;
                            $scope.pageNbrs.splice(0, $scope.pageNbrs.length, $scope.currentPage+1, $scope.currentPage + 2);
                        }
                    }
            } 
    $ctrl.dataservice.get(pageNbr)
        .then(
            function successCallback(response) {
                $ctrl.dataitems = response.dataitems;
            },
        )
    }
    $scope.$watch('$ctrl.refreshsignal',function(){
        $ctrl.dataservice.get($scope.currentPage)
            .then(
                function successCallback(response) {
                    $ctrl.dataitems = response.dataitems;
                },
            )
    })
})
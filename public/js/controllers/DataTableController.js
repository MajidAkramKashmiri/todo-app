app.controller('DataTableController', function($scope, $uibModal) {
    var $ctrl = this;
    $ctrl.$onInit = function() {
        $scope.currentPage = 0;
        $scope.isDisable = 0;
        $scope.pageNbrs = [1, 2];
        console.log($scope.pageNbrs);
        $ctrl.dataservice.get($scope.currentPage)
        .then(
            function successCallback(response) {
               $scope.totalPages = response.pagination.pagecount;
               $scope.totalEntries = response.pagination.dataCount;
               $ctrl.dataitems = response.data;
            },
        )
    }
    $scope.gotoPage=function(pageNbr){
        $scope.currentPage = pageNbr;
        console.log('current page is ' + $scope.currentPage);
        if ($scope.currentPage != $scope.totalPages - 1 && $scope.currentPage != 0){
            $scope.isDisable=0;
            $scope.pageNbrs.splice(0, $scope.pageNbrs.length ,$scope.currentPage, $scope.currentPage + 1, $scope.currentPage + 2);
        }
        else 
            if( $scope.currentPage == $scope.totalPages - 1 ) {
                $scope.isDisable = 1;
                $scope.pageNbrs.splice(0, $scope.pageNbrs.length,$scope.currentPage, $scope.currentPage + 1);
            }
            else 
                if( $scope.currentPage == 0 )
                    {                             
                        $scope.isDisabled=0;
                        $scope.pageNbrs.splice(0, $scope.pageNbrs.length,$scope.currentPage+1, $scope.currentPage + 2);
                    }
    $ctrl.dataservice.get(pageNbr)
        .then(
            function successCallback(response) {
                $ctrl.dataitems = response.data;
            },
        )
    }
    $scope.$watch('$ctrl.refreshsignal',function(){
        $ctrl.dataservice.get($scope.currentPage)
            .then(
                function successCallback(response) {
                    $ctrl.dataitems = response.data;
                },
            )
    })
})
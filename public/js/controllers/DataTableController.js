app.controller('DataTableController', function($scope, $uibModal) {
    var $ctrl = this;

    $ctrl.$onInit = function() {
        $scope.currentPage = 1; // Start with page number 1
        $scope.reloadTable($scope.currentPage);
    }

    $scope.gotoFirstPage = () => {
        $scope.gotoPage(1);
    }

    $scope.gotoPrevPage = () => {
        $scope.gotoPage($scope.currentPage - 1);
    }

    $scope.gotoNextPage = () => {
        $scope.gotoPage($scope.currentPage + 1);
    }

    $scope.gotoLastPage = () => {
        $scope.gotoPage($scope.pagination.pages);
    }

    $scope.gotoPage = (pageNbr) => {
        $scope.reloadTable(pageNbr);
    }

    $scope.reloadTable = (pageNbr) => {
        $ctrl.dataservice.get(pageNbr)
            .then(response => {
                $scope.updateTableData(response.dataitems);
                $scope.buildPagination(response.pagination);
            })
    }

    $scope.updateTableData = (dataitems) => {
        $ctrl.dataitems = dataitems;
    }

    $scope.buildPagination = (pagination) => {
        $scope.pagination = pagination;
        $scope.currentPage = pagination.page;
        $scope.pageNbrs = [];

        ((pagination.page - 2) > 0) ? $scope.pageNbrs.push(pagination.page - 2) : null; // Add previous page
        ((pagination.page - 1) > 0) ? $scope.pageNbrs.push(pagination.page - 1) : null; // Add previous page
        $scope.pageNbrs.push(pagination.page); // Add current page
        ((pagination.page + 1) <= pagination.pages) ? $scope.pageNbrs.push(pagination.page + 1) : null; // Add next page
        ((pagination.page + 2) <= pagination.pages) ? $scope.pageNbrs.push(pagination.page + 2) : null; // Add next page
    }

    $scope.$watch('$ctrl.refreshsignal', (oldVal, newVal) => {
        $scope.reloadTable($scope.currentPage);
    })
})

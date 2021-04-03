app.controller("CreateTodoListController", function ($scope, $uibModalInstance, $http, list, action, todoListService,) {
    console.log(list);
    console.log(action);
    $scope.list = list;
    $scope.priorities=["high","medium","low"];
    $scope.action = action;
    $scope.toAddTodo = function() {
        if ($scope.list._id) {
            todoListService.update($scope.list._id, $scope.list)
                .then(response=> {
                    $uibModalInstance.close();
                });
        }
        else {
            todoListService.create($scope.list)
                .then(response=> {
                    $uibModalInstance.close();
                });  
        }
        
    }
    $scope.ok = function () {
        $uibModalInstance.close();
    };
    $scope.dismiss = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
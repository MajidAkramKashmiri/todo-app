app.controller("CreateModal", function ($scope, $uibModalInstance, $http, user, action, UserService) {
    $scope.userdata = user;
    $scope.action = action;
    $scope.toAddUser = function() {
        if ($scope.userdata._id) {
            UserService.update($scope.userdata._id, $scope.userdata)
                .then(response=> {
                    $uibModalInstance.close();
                });

        }
        else {
            UserService.create($scope.userdata)
                .then(response=> {
                    
                    $uibModalInstance.close();
                }); 
           
        }
    }
    $scope.ok = function () {
        $uibModalInstance.close();
    };
    $scope.dismiss= function () {
        $uibModalInstance.dismiss('cancel');
    };
});
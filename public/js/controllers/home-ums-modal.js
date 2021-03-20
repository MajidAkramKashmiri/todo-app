app.controller("CreateUserController", function ($scope, $uibModalInstance, $http, user, UserService) {
    $scope.userdata = {
        username: "",
        password: "",
    }
    $scope.toAddUser = function() {
        UserService.create($scope.userdata)
            .then(response=> {
                $uibModalInstance.close();
            });
    }
    $scope.ok = function () {
        $uibModalInstance.close();
    };
    $scope.dismiss = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
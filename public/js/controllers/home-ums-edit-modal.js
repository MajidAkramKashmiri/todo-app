app.controller("UpdateUserController", function ($scope, $uibModalInstance, $http, edit, UserService) {
    $scope.userdata = {
        username: edit.username,
        password: edit.password,
    }
    console.log(edit);
    $scope.toUpdateUser = function() {
        UserService.update(edit.id,$scope.userdata)
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
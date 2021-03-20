app.controller("ViewUserController", function ($scope, $uibModalInstance, $http, view, UserService) {
   
   console.log(view);
    $scope.userdata = {
        username: view.username,
        password: view.password,
        id:view._id
    }
    $scope.okay = function () {
        $uibModalInstance.close();
    };
    $scope.dismiss = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
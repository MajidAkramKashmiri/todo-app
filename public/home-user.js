app.controller('homeController', function ($scope) {
    $scope.userManagement = function () {
    document.location.hash = "#!/home-ums"
    }
    $scope.todolist = function () {
    document.location.hash = "#!/home-todo"
    }
})

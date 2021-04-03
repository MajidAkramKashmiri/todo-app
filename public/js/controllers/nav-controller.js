app.controller("navController", function ($scope) {
    $scope.userData = JSON.parse(localStorage.loginData);
    $scope.User = $scope.userData.docs[0];
});

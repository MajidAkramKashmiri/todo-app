app.controller("navController", function ($scope) {
  $scope.adminData = JSON.parse(localStorage.loginData);
  $scope.admin = $scope.adminData.docs[0];
  console.log($scope.admin);
});

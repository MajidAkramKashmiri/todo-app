app.controller('navController', function ($scope) {
$scope.adminData=JSON.parse(localStorage.loginData);
console.log('User name is '+ $scope.adminData.docs[0].username);
$scope.admin=$scope.adminData.docs[0].username;
})
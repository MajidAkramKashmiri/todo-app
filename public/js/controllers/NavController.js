app.controller("NavController", function ($scope,$http) {
    $scope.userData = JSON.parse(localStorage.loginData);
    console.log( $scope.userData.user.token);
    $scope.User = $scope.userData.docs[0];
    $scope.logout = function(){
        $http({
            method: "PUT",
            url: "/api/auth/logout",
            data: { token:$scope.userData.user.token },
          })
          .then((res) => {
            document.location.hash = "#!/";
          })
          .catch((err) => {
            console.log("Cannot found the token")});
    }
});

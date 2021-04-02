var app = angular.module("myApp", ["ngRoute","ui.bootstrap"]);
app.config(function ($routeProvider) {
    $routeProvider.when("/", {
        template : "Root"
    });
    $routeProvider.when("/auth-login", {
        templateUrl : "html/auth-login.html"
    });
    $routeProvider.when("/home-user", {
        templateUrl : "html/home-user.html",
        controller: "HomeController"
    });
    $routeProvider.when("/home-todo", {
        templateUrl : "html/home-todo.html"
    });
    $routeProvider.when("/home-ums", {
        templateUrl : "html/home-ums.html"
    });
});
app.controller('loginController', function($scope,$http,loginService) {
    $scope.checkLogin = function() {
        let username = $scope.Username;
        let password = $scope.Password;
        loginService.post(username,password)
            .then(response=>{
                $scope.usrData = response;
            })
    }
})

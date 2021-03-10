var app = angular.module("myApp", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider.when("/", {
        template : "Root"
    });
    $routeProvider.when("/auth-login", {
        templateUrl : "auth-login.html"
    });
    $routeProvider.when("/home-user", {
        templateUrl : "home-user.html",
        controller:"homeController"
    });
    $routeProvider.when("/home-todo", {
        templateUrl : "home-todo.html"
    });
    $routeProvider.when("/home-ums", {
        templateUrl : "home-ums.html"
    });

});

app.controller('loginController', function($scope,$http) {

    $scope.checkLogin = function() {
    let username=$scope.Username;
    let password=$scope.Password;
        $http.post('/api/auth/login', { username: username, password: password })
            .then(res => {
                localStorage.loginData = JSON.stringify(res.data);
                document.location.hash="#!/home-user"
            })
            .catch(err => {
                console.log('catch => ', err);
                alert(err);
            });
    }
})



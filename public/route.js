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
});
app.controller('loginController',function($scope,$http){
    
    $scope.checkLogin=function(){
    let username=$scope.Username;
    let password=$scope.Password;
        $http.post('/api/auth/login', { username: username, password: password })
            .then(res => {
                console.log('then => ', res);
                console.log(res.data.token);
                console.log(document.location.hash);
                document.location.hash="#!/home-user"
            })
            .catch(err => {
                console.log('catch => ', err);
                alert(err);
            })


        // $http.post('/api/auth/login',{username:$scope.Username,password:$scope.Password}).then(function successCallback(response) {
        //    console.log("done")
        //   }, function errorCallback(response) {
        //  console.log("error")  
        // });;
    }
})

/*
1 - create login form
2 - add action on submit button and send call to auth api with login json data
3 - auth api respose
    1 - in case of success just redirect to home route
    2 - in case of error jsut show the message at FE

*/


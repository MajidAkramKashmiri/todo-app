app.controller('homeController',function($scope){
    $scope.userManagement=function(){
        alert("clicked");
        document.location.hash="#!/home-todo"
        
    }
    $scope.todolist=function(){
        alert("clicked");
        document.location.hash="#!/home-ums"
    }
})





// homeApp=angular.module("homeApp",[ng-route])
// homeApp.config(function($routeProvider) {
//     $routeProvider.when("", {
//         template : "UMS"
//     });
//     $routeProvider.when("", {
//         template : "ToDo"
//     });
// });
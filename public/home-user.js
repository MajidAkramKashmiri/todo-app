app.controller('homeController',function($scope){
    $scope.userManagement=function(){
        alert("clicked");
        document.location.hash="#!/home-todo"
        
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
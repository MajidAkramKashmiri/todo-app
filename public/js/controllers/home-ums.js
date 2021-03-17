app.controller("crudController", function ($scope, $http,UserService) {
    $scope.userManagement = function () {
        document.location.hash = "#!/home-ums"
    }
    $scope.todolist = function(){
    document.location.hash = "#!/home-todo"
    }
    $scope.data = {
        username: "",
        password: "",
    }
    UserService.get()
        .then(response=>{
            $scope.usrData=response;
        }) 
    $scope.addUser = function () {
        UserService.create($scope.data)
            .then(response=>{
            }) 
        UserService.get()
            .then(response=>{
             $scope.usrData=response;
            })  
    }
    $scope.edit = function (id, index) {
        $scope.data.username = $scope.usrData[index].username;
        $scope.data.password = $scope.usrData[index].password;
        $scope.updateUser = function () {
            UserService.update(id, $scope.data)
                .then(response=>{
                })    
            UserService.get()
                .then(response=>{
                    $scope.usrData=response;
                })  
        }
    }
    $scope.view = function (id) {
        UserService.getById(id)
            .then(response=>{
                console.log(response);
            })
    }
    $scope.delete = function (id) {
        UserService.delete(id)
            .then(response=>{
        })  
        UserService.get()
            .then(response=>{
            $scope.usrData=response;
            })   
    }
});
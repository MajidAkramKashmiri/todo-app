app.controller("todocontroller", function ($scope, $http,todoListService) {
    $scope.userManagement = function () {
    document.location.hash = "#!/home-ums"
    }
    $scope.todolist = function () {
    document.location.hash = "#!/home-todo"
    }
    $scope.list = {
        title: "",
        description: ""
    };
    todoListService.get()
        .then(response=>{
            $scope.todoListData = response;
         })
    $scope.addTodo = function () {
        todoListService.create($scope.list)
            .then(response=>{
                $scope.todoListData = response;
            })
        todoListService.get()
            .then(response=>{
                $scope.todoListData = response;
            })
    }
    $scope.edit = function (id, index) {
        $scope.list.title = $scope.todoListData[index].title;
        $scope.list.description = $scope.todoListData[index].description;
        $scope.updateTodo = function () {
            todoListService.update(id,$scope.list)
                .then(response=>{
                    console.log("List updated successfully");
                })
            todoListService.get()
                .then(response=>{
                    $scope.todoListData=response;
                })  
        }
    }
    $scope.delete = function (id) {
        todoListService.delete(id)
            .then(
                console.log("deleted successfully")
            )
        todoListService.get()
            .then(response=>{
                $scope.todoListData=response;
            })
    }
});
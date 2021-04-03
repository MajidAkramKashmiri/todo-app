app.controller("TodoController", function ($scope, $http, $uibModal, todoListService) {
    $scope.refreshDataTable = 0; 
    $scope.userManagement = function () {
        document.location.hash = "#!/home-ums"
    }
    $scope.todolist = function () {
        document.location.hash = "#!/home-todo"
    }
    $scope.Service = todoListService;
    $scope.list = {
        title: "",
        priority:"",
        description: ""
    };
    $scope.ListDefinition = [
        {
            label:'Title',
            dataType:'text',
            data:(item)=>{
                return item.title
                console.log("todoListItem");
            }
        },
        {
            label:'Priority',
            dataType:'text',
            data:(item)=>{
                return item.priority
            }
        },
        {
            label:'Description',
            dataType:'text',
            data:(item)=>{
                
                return item.description  
            }
        },
        {   
            label:'',
            dataType: 'button',
            action: (item, index) => 
                {
                    return $scope.open(item,'VIEW');
                },
            actionLabel:'View',
            actionCssClass:'btn btn-success'    
        },
        {   
            label:'',
            dataType: 'button',
            action: (item, index) => { 
               return  $scope.open(item,'EDIT'); 
            },
            actionLabel:'Edit',
            actionCssClass:'btn btn-warning'
        },
        {   
            label:'',
            dataType: 'button',
            action: (item, index) => { 
                $scope.refreshDataTable++;
                return $scope.delete(item._id);
            },
            actionLabel:'Delete',
            actionCssClass:'btn btn-danger'
        }

]
    $scope.open = function (list, action) {
        let modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: "html/createTodoModal.html",
            controller: "CreateTodoListController",
            resolve: {
                list: function () {
                    return list;
                },
                action: function () {
                    return action;
                }
            }
        });
        modalInstance.result.then(function() {
            todoListService.get()
                .then(response=>{
                    $scope.refreshDataTable++;
                    $scope.todoListData=response;
                }) 
        }, 
            function() {
            }
        );
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
app.controller("crudController", function ($scope, $http,$uibModal,UserService) {
    $scope.userManagement = function () {
        document.location.hash = "#!/home-ums"
    }
    $scope.todolist = function(){
    document.location.hash = "#!/home-todo"
    }
    $scope.UserService=UserService;
    $scope.data = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: ""
    }
    $scope.userDefinition = [
        {
            label:'UserAvatar',
            dataType:'userAvatar',
            data:(item)=>{
               return item.username
            }
        },
        {
            label:'Username',
            dataType:'text',
            data:(item)=>{
               return item.username
            }
        },
        {
            label:'First Name',
            dataType:'text',
            data:(item)=>{
                return item.firstName
            }
        },
        {
            label:'Last Name',
            dataType:'text',
            data:(item)=>{
                return item.lastName
            }
        },
        {
            label:'View',
            dataType:'view',
            data:(item)=>{
                console.log(item);
                return item
            }
        },
        {
            label:'Edit',
            dataType:'edit',
            data:(item)=>{
                return item
            }
        },
        {
            label:'Delete',
            dataType:'delete',
            data:(item)=>{
                return item
            }
        }

    ]
    $scope.open = function (user, action) {
        let modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: "html/createUserModal.html",
            controller: "CreateUserController",
            resolve: {
                user: function () {
                    return user;
                },
                action: function () {
                    return action;
                }
            }
        });
        modalInstance.result.then(function() {
            UserService.get()
                .then(response=>{
                    $scope.usrData=response;
                }) 
            }, 
            function(){
            }
        );
    };
     
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
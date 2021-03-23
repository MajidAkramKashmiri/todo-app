app.controller("crudController", function ($scope, $http,$uibModal,UserService) {
    $scope.userManagement = function () {
        document.location.hash = "#!/home-ums"
    }
    $scope.todolist = function(){
    document.location.hash = "#!/home-todo"
    }
    $scope.data = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: ""
    }
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
        modalInstance.result.then(function(){
            UserService.get()
                .then(response=>{
                    $scope.usrData=response;
                }) 
            }, 
            function(){
            }
        );
    };
   
    // $scope.edit = function (id, index) {
    //     $scope.data.username = $scope.usrData[index].username;
    //     $scope.data.password = $scope.usrData[index].password;
    //     $scope.data.id=id;
    //     let modalInstance = $uibModal.open({
    //         ariaLabelledBy: 'modal-title',
    //         ariaDescribedBy: 'modal-body',
    //         templateUrl: "html/edit-user-modal.html",
    //         controller: "UpdateUserController"
    //         ,resolve: {
    //             edit: function () {
    //             return $scope.data;
    //             }
    //         }
    //     });
    //     modalInstance.result.then(function() {
    //         UserService.get()
    //             .then(response=>{
    //                 $scope.usrData=response;
    //             })
    //     }, 
    //     function(){
    //     });
    // };

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

    // $scope.view = function (id) {
    //     UserService.getById(id)
    //         .then(response=>{
    //             let modalInstance = $uibModal.open({
    //                 ariaLabelledBy: 'modal-title',
    //                 ariaDescribedBy: 'modal-body',
    //                 templateUrl: "html/view-user-modal.html",
    //                 controller: "ViewUserController"
    //                 ,resolve: {
    //                     view: function () {
    //                         return response;
    //                     }
    //                 }
    //             })
    //         })
    // }
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


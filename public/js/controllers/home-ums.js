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
    }
    $scope.open = function () {
        
      //var parentElem = parentSelector ? 
        //  angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        let modalInstance = $uibModal.open({
          //animation: $ctrl.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: "html/createUserModal.html",
        controller: 'CreateUserController',
        controllerAs: '$ctrl',
         // size: size,
          //appendTo: parentElem,
          resolve: {
            user: function () {
              return $scope.data;
            }
          }
        });
        modalInstance.result.then(function(){

        }, function(){

        });
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

app.controller("CreateUserController", function ($scope, $uibModalInstance, $http,user) {
 
 console.log(user);
    // alert(users.data.username);
    $scope.ok = function () {
        $uibModalInstance.close();
      };
    
      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };

})

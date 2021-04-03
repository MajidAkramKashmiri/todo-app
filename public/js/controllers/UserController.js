app.controller("UserController", function ($scope, $http,$uibModal,UserService) {
    $scope.refreshDataTable=0;
    $scope.currentPage=0; 
    $scope.isDisabled=1;
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
            dataType:'userAvatar',
            data:(item)=>{
               return item
            },
            headerCssClass: '',
            columnCssClass: '',
            actionCssClass: ''    
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
    $scope.open = function (user, action) {
        let modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: "html/createUserModal.html",
            controller: "CreateModal",
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
            console.log("entered the result");
            $scope.refreshDataTable++;
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
    }
    // $scope.next=function(){
    //     $scope.pagenumber = $scope.pagenumber + 10;
    //     console.log($scope.pagenumber);
    //     UserService.get($scope.pagenumber)
    //         .then(response=>{
    //             if($scope.pagenumber>=(response.userDataCount-(response.userDataCount%10)))
    //             {
    //                 $scope.refreshDataTable++; 
    //                 $scope.isDisabled=0; 
    //             }
    //             else {
    //                 $scope.isDisabled=1;
    //                 $scope.refreshDataTable++;
    //             }
    //         })
    // }
    // $scope.previous=function(){
        
    //     if  ($scope.pagenumber > 0)  {
    //         $scope.isDisabled=1;
    //         $scope.pagenumber = $scope.pagenumber - 10;
    //       //  console.log($scope.pagenumber);
    //         UserService.get($scope.pagenumber)
    //             .then(response=>{
    //                 $scope.refreshDataTable++;
    //             })
    //     }
    // }
    // $scope.first=function(){
    //     $scope.pagenumber = 0;
    //     $scope.isDisabled=1;
    //     UserService.get($scope.pagenumber)
    //         .then(response=>{
    //            $scope.refreshDataTable++;
    //         })
    // }
    // $scope.last=function(){
    //     $scope.pagenumber = $scope.totalUserCount-($scope.totalUserCount%10);
    //     //console.log($scope.pagenumber);
    //     UserService.get($scope.pagenumber)
    //         .then(response=>{
    //         $scope.refreshDataTable++;
    //         $scope.isDisabled=0;
    //         })
    // }
});
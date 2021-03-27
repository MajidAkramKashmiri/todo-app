app.controller('DataTableController', function($scope, $uibModal) {
    var $ctrl = this;
    $ctrl.$onInit = function() {
        $ctrl.dataservice.get()
        .then(
            function successCallback(response) {
                $ctrl.dataitems = response;
            },
        )
        $scope.open = function (user, action) {
            let modalInstance = $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: "html/createUserModal.html",
                controller: "CreateUserController",
                resolve: {
                    user: function() {
                        return user;
                    },
                    action: function() {
                        return action;
                    }
                }
            });
            modalInstance.result.then(function() {
                $ctrl.dataservice.get()
                    .then(response=> {
                        $ctrl.dataitems=response;
                    }) 
            }, 
                function(){
                }
            );
        };
        $scope.delete = function (id) {
            $ctrl.dataservice.delete(id)
                .then(response=>{
                })  
                $ctrl.dataservice.get()
                .then(response=>{
                    $ctrl.dataitems = response;
                })   
        }
    
    }
})
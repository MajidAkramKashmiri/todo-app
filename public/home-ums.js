app.controller("crudController", function ($scope, $http) {
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
    $http({
        method: 'GET',
        url: '/user',
        headers : { token: localStorage.getItem('token') }
    }) 
    .then(function successCallback (response) {
        $scope.usrData = response.data;
    },
    function errorCallback (response) {
        console.log("error");
    });
    $scope.addUser = function () {
        $http({
            method: 'POST',
            url: '/user', 
            data: $scope.data,
            headers: {token: localStorage.getItem('token')}
        })
        .then(function successCallback (response) {
            },
            function errorCallback (response) {
            console.log("error");
            }
        );
        $http({
            method: 'GET',
            url: '/user',
            headers: { token : localStorage.getItem('token')}
        })
        .then(function successCallback (response) {
            $scope.usrData = response.data;
            },
            function errorCallback (response) {
            console.log("error");
            }
        );
    }
                
    $scope.edit = function (id, index) {
        $scope.data.username = $scope.usrData[index].username;
        $scope.data.password = $scope.usrData[index].password;
        $scope.updateUser = function () {
            $http({
                method: 'PUT',
                url: '/user/'+id,
                data: $scope.data,
                headers: { token : localStorage.getItem('token') }
            })
            .then(function successCallback (response) {
                },
                function errorCallback (response) {
                console.log("error");
                }
            );
            $http({
                method: 'GET',
                url: '/user',
                headers: { token: localStorage.getItem('token') }
            })
            .then(function successCallback(response) {
                $scope.usrData = response.data;
                },
                function errorCallback(response) {
                console.log("error");
                }
            );
        }
    }
    $scope.view = function () {
        $http({
            method: 'GET',
            url: '/user/:id',
            headers: { token: localStorage.getItem('token') }
         })
        .then(function successCallback (response) {
            console.log(response.data);   
            }, 
            function errorCallback (response) {
            console.log("error");
            });
    }
    $scope.delete = function (id) {
        $http({
            method: 'DELETE',
            url: '/user/'+id,
            headers: {token: localStorage.getItem('token')}
        })
        .then(function successCallback (response) {
            console.log('deleted successfully');
            },
            function errorCallback (response) {
                console.log("error");
            }
        );
        $http({
            method: 'GET',
            url: '/user',
            headers: {token: localStorage.getItem('token')}
        })
        .then(function successCallback  (response) {
            $scope.usrData = response.data;
            },
            function errorCallback(response) {
            console.log("error");
            }
        );
    }
});
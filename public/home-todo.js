app.controller("todocontroller", function ($scope, $http) {
    $scope.userManagement = function () {
    document.location.hash = "#!/home-ums"
    }
    $scope.todolist = function () {
    document.location.hash = "#!/home-todo"
    }
    var loginData = JSON.parse(localStorage.loginData);
    $scope.list = {
        title: "",
        description: ""
    };
    $http({
        method: 'GET',
        url: '/todo/' + loginData.user.userId,
        headers: { token: localStorage.getItem('token') }
    })
    .then(
        function successCallback (response) {
            $scope.todoListData = response.data;
        },
        function errorCallback (response) {
            console.log("error");
        }
    );
    $scope.addTodo = function () {
        $http({
            method: 'POST',
            url: '/todo/' + loginData.user.userId,
            data: $scope.list,
            headers: { token: localStorage.getItem('token') }
        })
        .then(
            function successCallback (response) {  
            },
            function errorCallback (response) {
                console.log("error");
            }
        );
        $http({
            method: 'GET',
            url: '/todo/'+ loginData.user.userId,
            headers: { token: localStorage.getItem('token') }
        })
        .then(
            function successCallback(response) {
                $scope.todoListData = response.data;
            },
            function errorCallback(response) {
                console.log("error");
            }
        );
    }
    $scope.edit = function (id,index) {
        $scope.list.title = $scope.todoListData[index].title;
        $scope.list.description = $scope.todoListData[index].description;
        $scope.updateTodo = function () {
            $http({
                method: 'PUT',
                url: `/todo/${ loginData.user.userId }/${ id }`,
                data: $scope.list,
                headers: { token: localStorage.getItem('token') }
            })
            .then(
                function successCallback (response) {
                },
                function errorCallback (response) {
                    console.log("error");
                }
            );
            $http({ 
                method: 'GET',
                url: '/todo/'+ loginData.user.userId,
                headers: {  token: localStorage.getItem('token')   }
            })
            .then(
                function successCallback (response) {
                    console.log("List Updated")
                    $scope.todoListData = response.data;
                },
                function errorCallback (response) {
                    console.log("error");
                }
            );
        }
    }

    $scope.delete = function (id) {
        console.log(id);
        $http ({
            method: 'DELETE',
            url:`/todo/${ loginData.user._id }/${ id }`,
            headers: { token : localStorage.getItem('token') }
        })
        .then(
            function successCallback (response) {
                console.log('deleted successfully');
            },
            function errorCallback (response) {
                console.log("error");
            }
        );
        $http({  
            method: 'GET',
            url: `/todo/${loginData.user.userId}`,
            headers: { token : localStorage.getItem('token') }
        })
        .then(
            function successCallback (response) {
                $scope.todoListData=response.data;
            },
            function errorCallback(response) {
                console.log("error");
            }
        );
    }
});
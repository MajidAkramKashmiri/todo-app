app.controller("todocontroller", function($scope, $http){
    var loginData = JSON.parse(localStorage.loginData);
    console.log(loginData.user._id);

    $scope.list = {
        title: "",
        description: ""
    };
    $http({
        method: 'GET',
        url: '/todo/' + loginData.user._id,
    })
        .then(
            function successCallback(response){
                console.log(response.data);
                $scope.todoListData = response.data;
                console.log($scope.todoListData);
            },
            function errorCallback(response){
                console.log("error");
            }
        );

    $scope.addTodo=function(){
        console.log($scope.list);
        $http.post('/todo/' + loginData.user._id ,$scope.list)
        .then(
            function successCallback(response){  /////////////// WHY GET REQUEST NOT INSIDE THE CALLBACK?

            },
            function errorCallback(response) {
                console.log("error");
            }
        );
        $http({
            method: 'GET',
            url: '/todo/'+ loginData.user._id
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

    $scope.edit=function(id,index) {
        console.log('index is ' + index);
        $scope.list.title=$scope.todoListData[index].title;
        $scope.list.description=$scope.todoListData[index].description;
        $scope.updateTodo=function(){
            $http({
                method: 'PUT',
                url: `/todo/${loginData.user._id}/${id}`,
                data:$scope.list
            })
                .then(
                    function successCallback(response) {
                        //   $scope.usrData=response.data;
                    },
                    function errorCallback(response) {
                        console.log("error");
                    }
                );
            $http({ /////////////// WHY GET REQUEST NOT INSIDE THE CALLBACK?
                method: 'GET',
                url: '/todo/'+ loginData.user._id
            })
                .then(
                    function successCallback(response) {
                        console.log("List Updated")
                        $scope.todoListData = response.data;
                    },
                    function errorCallback(response) {
                        console.log("error");
                    }
                );
        }
    }

    $scope.delete = function(id){
        console.log(id);
        $http ({
            method: 'DELETE',
            url:`/todo/${loginData.user._id}/${id}`
        })
            .then(
                function successCallback(response){
                    console.log('deleted successfully');
                },
                function errorCallback(response) {
                    console.log("error");
                }
            );
        $http({  /////////////// WHY GET REQUEST NOT INSIDE THE CALLBACK?
            method: 'GET',
            url: `/todo/${loginData.user._id}`
        })
            .then(
                function successCallback(response) {
                    $scope.todoListData=response.data;
                },
                function errorCallback(response) {
                    console.log("error");
                }
            );
    }
});



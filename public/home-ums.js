app.controller("crudController", function($scope, $http){
    $scope.data={
        username:"",
        password:"",
    }
    $http({
        method: 'GET',
        url: '/user'
    }) 
        .then(function successCallback(response){
            console.log(response.data);   
            $scope.usrData=response.data;
                
        },
        function errorCallback(response){
        console.log("error");
        });
    
    $scope.addUser = function(){
        console.log( $scope.data );
        $http.post('/user', $scope.data)
            .then(function successCallback(response){
                //console.log(response.data);   
                // $scope.usrData=response.data;
                //console.log(usrData);
            },
            function errorCallback(response) {
            console.log("error");
            });
        $http({
            method: 'GET',
            url: '/user'
        })
            .then(function successCallback(response) {
                $scope.usrData=response.data;
            },
            function errorCallback(response) {
                console.log("error");
            }
            );
    }
                
    $scope.edit=function(id,index){
        alert('clicked');
        console.log('index is ' + index);  
        $scope.data.username=$scope.usrData[index].username;
        $scope.data.password=$scope.usrData[index].password;
        $scope.updateUser=function(){
            alert('clicked');
            $http({
                method: 'PUT',
                url: '/user/'+id,
                data:$scope.data
            })
            .then(function successCallback(response) {
                //   $scope.usrData=response.data;  
            },
            function errorCallback(response) {
                console.log("error");
            });
            $http({
                method: 'GET',
                url: '/user'
            })
            .then(function successCallback(response) {
                console.log("userUpdated")
                $scope.usrData=response.data;
            },
            function errorCallback(response) {
                console.log("error");
            });
        }
    }

    $scope.view=function(){
        alert('clicked');
        $http({
            method: 'GET',
            url: '/user/:id'
        })
            .then(function successCallback(response) {
                console.log(response.data);   
            }, 
            function errorCallback(response) {
                console.log("error");
            });
    }
    
    $scope.delete=function(id){
        console.log(id); 
        $http({
            method: 'DELETE',
            url: '/user/'+id
        })
            .then(function successCallback(response) {
                console.log('deleted successfully');
            },
            function errorCallback(response) {
                console.log("error");
            });
        $http({
            method: 'GET',
            url: '/user'
        })
            .then(function successCallback(response) {
                $scope.usrData = response.data;
            },
            function errorCallback(response) {
                console.log("error");
            });
    }
});
app.service('todoListService', function($http) {
    var loginData = JSON.parse(localStorage.loginData);
    this.get = function() {
        return $http({
            method: 'GET',
            url: '/todo/' + loginData.user.userId,
            headers: { token: localStorage.getItem('token') }
        })
        .then(
            function successCallback (response) {
               return response.data;
            },
            function errorCallback (response) {
               return response.data;
            }
        );
    }
    this.create=function(data){
        return $http({
            method: 'POST',
            url: '/todo/' + loginData.user.userId,
            data: data,
            headers: { token: localStorage.getItem('token') }
        })
        .then(
            function successCallback (response) {  
                return response.data;
            },
            function errorCallback (response) {
                return response.data;
            }
        );
    }
    this.delete = function(id){
        return $http ({
            method: 'DELETE',
            url:`/todo/${ loginData.user.userId }/${ id }`,
            headers: { token : localStorage.getItem('token') }
        })
        .then(
            function successCallback (response) {
                return response.data;
            },
            function errorCallback (response) {
                return response.data;
            }
        );
    }
    this.update=function(id,data){
        return $http({
            method: 'PUT',
            url: `/todo/${ loginData.user.userId }/${ id }`,
            data: data,
            headers: { token: localStorage.getItem('token') }
        })
        .then(
            function successCallback (response) {
            return response.data;
        },
            function errorCallback (response) {
                return response.data;
            }
        );
    }
})
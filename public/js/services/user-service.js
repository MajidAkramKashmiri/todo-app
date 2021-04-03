app.service('UserService', function($http) {
    this.get = function(pageNbr=1) {
        return  $http({
            method: 'GET',
            url: '/user?pageNbr='+pageNbr,
            headers : { token: localStorage.getItem('token') }
        }) 
            .then(
                function successCallback (response) {
                    console.log(response.data);
                    return response.data
                },
                function errorCallback (response) {
                    return response.data;
                }   
            );
    }
    this.getById = function(id) {
        return  $http({
            method: 'GET',
            url: '/user/'+id,
            headers: { token: localStorage.getItem('token') }
        })
            .then(function successCallback (response) {
                return response.data[0];   
                }, 
                function errorCallback (response) {
                    return response.data;
                }
            );
    }
    this.create = function(data) {
        return $http({
            method: 'POST',
            url: '/user', 
            data: data,
            headers: { token: localStorage.getItem('token') }
        })
            .then(function successCallback (response) {
                console.log(response.data);
                return response.data;    
                },
                function errorCallback (response) {
                    return response.data;
                }
            );
    }
    this.update = function(id, data) {
        return $http({
            method: 'PUT',
            url: '/user/'+id,
            data: data,
            headers: { token : localStorage.getItem('token') }
        })
            .then(function successCallback (response) {
                return response.data;
                },
                function errorCallback (response) {
                    return response.data;
                }
            );

    }
    this.delete = function(id) {
        return $http({
            method: 'DELETE',
            url: '/user/'+id,
            headers: { token: localStorage.getItem('token') }
        })
            .then(function successCallback (response) {
                return response.data;
                },
                function errorCallback (response) {
                    return response.data;
                }
            );
    }
})
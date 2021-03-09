app.controller("crudController",function($scope,$http)
{
    $scope.data=
    {
        username:"",
        password:"",
    }
    
    $http({
                method: 'GET',
                url: '/user'
        }) 
            .then(function successCallback(response)
                {
                        console.log(response.data);   
                        $scope.usrData=response.data;
                        //console.log(usrData);
                },
            function errorCallback(response)
                    {
                        console.log("error");
                    });
   


    $scope.addUser=function()
    {
        console.log($scope.data);
        $http.post('/user',$scope.data).
        then(function successCallback(response)
         {
                     //console.log(response.data);   
                    // $scope.usrData=response.data;
                    //console.log(usrData);
         }, 
         function errorCallback(response) 
            {
                console.log("error");
            });
         
            $http({
                    method: 'GET',
                    url: '/user'
                  })
                  .then(function successCallback(response) 
                            {
                                $scope.usrData=response.data;
                            },
                            function errorCallback(response) 
                            {
                                    console.log("error");
                            }
                        );
    }
            
        
        
        
    $scope.edit=function(id,index)
    {
        alert('clicked');
        console.log('index is ' + index);  
        $scope.data.username=$scope.usrData[index].username;
        $scope.data.password=$scope.usrData[index].password;
        $scope.updateUser=function()
        {
            alert('clicked');
            $http({
                    method: 'PUT',
                    url: '/user/'+id,
                    data:$scope.data
                  })
                  .then(function successCallback(response) 
                            {
                                //   $scope.usrData=response.data;  
                            },
                            function errorCallback(response) 
                            {
                                console.log("error");
                                }
                        );
        }
            
            
            
    }


    $scope.view=function()
    {
        alert('clicked');
        $http({
                method: 'GET',
                url: '/user/:id'
             })
             .then(function successCallback(response) 
                        {
                            console.log(response.data);   
                            //$scope.usrData=response.data;
                            //console.log(usrData);
                        }, 
                        function errorCallback(response) 
                        {
                            console.log("error");
                        }
                    );
                   
                                
    }
    
    
    $scope.delete=function(id)
    {
       console.log(id); 
       $http({
                    method: 'DELETE',
                    url: '/user/'+id
             })
             .then(function successCallback(response)
                        {
                            console.log('deleted successfully');
                            // $scope.usrData=response.data;
                    
                        },
                        function errorCallback(response) 
                        {
                        console.log("error");
                        }
                  );
                        //  alert('Clicked');
                        // $http.delete('/user/:id', $scope.usrData[$index]).then(function (response) {
                        //     console.log('Successfully Deleted')
                        //     }, function (response) {
                        // this function handles error
                        //    });
                        // let index=this.$index;
                        // $scope.record.splice(index,1);
    }
            

         
    
                    // $scope.record.push({
                    //     "name": $scope.data.name,
                    //     "age":$scope.data.age,
                    //     "address":$scope.data.address

                    // });
                    // $scope.data.name="Maqsood";
                    // $scope.data.age="";
                    // $scope.data.address="";
                    


                // $scope.edit=function(){
                //     index=this.$index;
                

                    
                //     $scope.data.name=$scope.record[index].name;
                //     $scope.data.age=$scope.record[index].age;
                //     $scope.data.address=$scope.record[index].address;
                    

                // }
                //console.log('usrData'+$scope.usrData);

});
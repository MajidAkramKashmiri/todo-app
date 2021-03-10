app.controller("todocontroller",function($scope,$http){
$scope.list={
    title:"",
    description:""
};
$http({
    method: 'GET',
    url: '/todo'
}) 
.then(function successCallback(response)
    {
            console.log(response.data);   
            $scope.todoListData=response.data;
            console.log($scope.todoListData);
    },
function errorCallback(response)
        {
            console.log("error");
        });



        $scope.addTodo=function()
        {
            console.log($scope.list);
            $http.post('/todo',$scope.list).
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
                        url: '/todo'
                      })
                      .then(function successCallback(response) 
                                {
                                    $scope.todoListData=response.data;
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
        $scope.list.title=$scope.todoListData[index].title;
        $scope.list.description=$scope.todoListData[index].description;
        $scope.updateTodo=function()
        {
            alert('clicked');
            $http({
                    method: 'PUT',
                    url: '/todo/'+id,
                    data:$scope.list
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
                                $http({
                                    method: 'GET',
                                    url: '/todo'
                                  })
                                  .then(function successCallback(response) 
                                            {
                                               console.log("List Updated")
                                                 $scope.todoListData=response.data;
                                            },
                                            function errorCallback(response) 
                                            {
                                                    console.log("error");
                                            }
                                        
                        
                                                           );
        }
        
            
            
    }




        $scope.delete=function(id)
    {
       console.log(id); 
       $http({
                    method: 'DELETE',
                    url: '/todo/'+id
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
                  $http({
                    method: 'GET',
                    url: '/todo'
                  })
                  .then(function successCallback(response) 
                            {
                              $scope.todoListData=response.data;
                            },
                            function errorCallback(response) 
                            {
                                    console.log("error");
                            }
                        );
                        
    }
            

                
            

});



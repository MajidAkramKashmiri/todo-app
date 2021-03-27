app.controller('DataTableController', function() {
    var $ctrl = this;
    $ctrl.$onInit = function() {
        $ctrl.dataservice.get()
        .then(
            function successCallback (response) {
                console.log(response);
                $ctrl.dataitems = response;
                console.log($ctrl.definition);
            },
        )
    }
})
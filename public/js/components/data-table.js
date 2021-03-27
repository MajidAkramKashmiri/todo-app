app.component('datatable', {
    bindings: {
        definition: '<',
        dataservice: '<'
    },
    templateUrl: 'html/dataTableTemplate.html',
    controller: 'DataTableController'
})

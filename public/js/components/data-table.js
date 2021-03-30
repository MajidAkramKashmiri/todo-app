app.component('datatable', {
    bindings: {
        definition: '<',
        dataservice: '<',
        refreshsignal: '<'
    },
    templateUrl: 'html/dataTableTemplate.html',
    controller: 'DataTableController'
})

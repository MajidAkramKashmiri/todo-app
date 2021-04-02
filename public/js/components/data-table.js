app.component('datatable', {
    bindings: {
        definition: '<',
        dataservice: '<',
        refreshsignal: '<',
        pagenumber:'<'
    },
    templateUrl: 'html/dataTableTemplate.html',
    controller: 'DataTableController'
})

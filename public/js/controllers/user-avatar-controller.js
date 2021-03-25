app.controller('userAvatarController', function() {
    var $ctrl = this;
    $ctrl.$onInit = function() {
        $ctrl.initials = $ctrl.user.firstName.charAt(0)+$ctrl.user.lastName.charAt(0);
        $ctrl.initials = $ctrl.initials.toUpperCase();
    }
})
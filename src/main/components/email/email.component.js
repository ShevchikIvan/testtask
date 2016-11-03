mainModule.component('email', {
    templateUrl: 'src/main/components/email/email.view.html',
    controller: emailController,
    bindings: {
        email: '='
    }
});

function emailController($scope) {
    var ctrl = this;
    
    $scope.getField = function(field) {
        try {
            return ctrl.email.payload.headers.find(function(item){ return item.name == field }).value
        } catch (e) {
            return ""
        }
    }
}
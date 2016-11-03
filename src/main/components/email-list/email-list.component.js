mainModule.component('emailList', {
    templateUrl: 'src/main/components/email-list/email-list.view.html',
    controller: emailListController,
    bindings: {
        emails: '='
    }
});

function emailListController($scope, $mdDialog) {
    $scope.showEmailDetails = function(ev, email) {
        $mdDialog.show({
            controller: dialogController,
            templateUrl: '/src/main/components/email-list/email-details.view.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: false,
            locals: {
                email: email
            },
            bindToController: true,
            controllerAs: '$ctrl'
        })
            .then(function() {
            }, function() {
            });
    };

    function dialogController($scope, $mdDialog) {

        var ctrl = this;

        // GoogleAPI.getEmail(this.email.id).then(function(response) {
        //     $scope.fullMail = response;
        // });

        $scope.cancel = function() {
            $mdDialog.hide();
        }

        $scope.getBody = function() {
            try {
                return window.atob(ctrl.email.payload.body.data.replace(/-/g, '+').replace(/_/g, '/') )
            } catch (e) {

                try {
                    return window.atob(ctrl.email.payload.parts.find(function(part){ return (part.mimeType == 'text/plain' || part.mimeType == 'text/html') }).body.data.replace(/-/g, '+').replace(/_/g, '/') )
                } catch (e1) {

                }

                return "Empty Body"
            }
        };
        $scope.getField = function(field) {
            try {
                return ctrl.email.payload.headers.find(function(item){ return item.name == field }).value
            } catch (e) {
                return ""
            }
        }
    }
}

mainModule.service('Emails', ['$http', 'appConfig',
    function($http, appConfig) {
        this.emails = null;

        this.getEmails = function(update){
            if (update || !this.emails) {
                this.emails = makeRequest();
            }
            return this.emails;
        };

        function makeRequest() {
            return $http.get(appConfig.resources + '/emails.json').then(function (response) {
                return response.data.emails;
            })
        };

    }]);
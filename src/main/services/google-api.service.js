mainModule.service('GoogleAPI', ['$http', 'appConfig',
    function() {
        this.userInfo = null;
        this.pageToken = '';

        this.getUserInfo = function(update) {
            if (update || !this.userInfo) {
                this.userInfo = gapi.client.request({
                    'path':'/plus/v1/people/me',
                    'method':'GET'
                }).then(function (response) {
                    return response.result;
                })
            }
            return this.userInfo;
        };

        this.getEmails = function(pageToken) {
            var mailRequest = function(id) {
                return gapi.client.request({
                    'path':'/gmail/v1/users/me/messages/' + id
                });
            };

            var batch = gapi.client.newBatch();
            var promise = gapi.client.request({
                'path':'/gmail/v1/users/me/messages?format=full&maxResults=20&labelIds=INBOX&pageToken=' + (pageToken ? pageToken : ''),
                'method':'GET'
            }).then(function (response) {
                response.result.messages.forEach(function(message) {
                    batch.add(mailRequest(message.id))
                });
                return batch.then(function(response2) {
                    var array = [];
                    for (var i in response2.result) {
                        array.push(response2.result[i].result);
                    }
                    return { array: array, pageToken: response.result.nextPageToken };
                });
            });
            return promise;
        };

        // this.getEmail = function(id) {
        //     var promise = gapi.client.request({
        //         'path':'/gmail/v1/users/me/messages/' + id
        //     }).then(function(response) {
        //         return response.result
        //     });
        //     return promise;
        // };

    }]);
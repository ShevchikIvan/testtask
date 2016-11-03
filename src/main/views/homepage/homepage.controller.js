mainModule.controller('homepageController', ['$scope', 'Emails', 'GoogleAPI', '$timeout',
    function ($scope, Emails, GoogleAPI, $timeout) {

        $scope.signedIn = false;
        $scope.emails = [];
        $scope.pageToken = null;

        $scope.fetchEmails = function() {
            GoogleAPI.getEmails($scope.pageToken).then(function(data) {
                $timeout(function() {
                    $scope.emails.push.apply($scope.emails, data.array);
                    $scope.pageToken = data.pageToken;
                })
            })
        };

        // Here we do the authentication processing and error handling.
        // Note that authResult is a JSON object.
        $scope.processAuth = function(authResult) {
            // Do a check if authentication has been successful.
            if(authResult['access_token']) {
                $scope.signedIn = true;
                $scope.emails = [];

                GoogleAPI.getUserInfo().then(function(data) {
                    $timeout(function() {
                        $scope.userInfo = data;
                    })
                });

                $scope.fetchEmails();

            } else if(authResult['error']) {
                $scope.signedIn = false;
            }
        };

        // When callback is received, we need to process authentication.
        $scope.signInCallback = function(authResult) {
            $timeout(function() {
                $scope.processAuth(authResult);
            });
        };

        $scope.renderSignInButton = function() {
            gapi.signin.render('signInButton',
                {
                    'callback': $scope.signInCallback, // Function handling the callback.
                    'clientid': '723271167071-6r894ih22j1g88fu5hq7vkej9orvfngc.apps.googleusercontent.com', // CLIENT_ID from developer console which has been explained earlier.
                    'requestvisibleactions': 'http://schemas.google.com/AddActivity',
                    'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/gmail.readonly',
                    'cookiepolicy': 'single_host_origin'
                }
            );
        };

        $scope.userInfoCallback = function(userInfo) {
            $timeout(function() {
                $scope.userInfo = userInfo;
            });
        };
        
        $scope.logout = function() {
            if ($scope.signedIn) {
                gapi.auth.signOut();
                $timeout(function() {
                    $scope.emails = [];
                    $scope.pageToken = null;
                    $scope.signedIn = false;
                    })

            }
        };


        $scope.renderSignInButton();


        //// download from json file
        // Emails.getEmails().then(function(resp) {
        //     $scope.emails = resp;
        // });
        
    }
]);
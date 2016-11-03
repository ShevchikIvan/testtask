var testApp = angular.module('testApp', ['mainModule', 'ui.router'])
    .config(appRoutes);

function appRoutes($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('main', {
            abstract: true,
            templateUrl: '/src/main/main.view.html',
            controller: 'mainController',
            controllerAs: 'main'
        });

    $urlRouterProvider.otherwise('/');
}
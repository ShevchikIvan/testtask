var mainModule = angular.module('mainModule', ['ngMaterial', 'ui.router', 'infinite-scroll']);

function mainRoutes($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('main.homepage', {
            url: '/',
            templateUrl: 'src/main/views/homepage/homepage.view.html',
            controller: 'homepageController',
            controllerAs: 'homepage'
        });

    $urlRouterProvider.otherwise('/');
}

mainModule
    .config(mainRoutes);
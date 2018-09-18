'use strict';


var routerApp = angular.module('myApp', [
    'ui.router',
    'ui.bootstrap'
]);

routerApp.config(function ($stateProvider, $urlRouterProvider) {



    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'view1/view1.html',
            controller: 'aboutCtrl'
        })

    // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
    // .state('about', {
    //     url: '/about',
    //     templateUrl: 'view2/view2.html',
    //     controller: 'aboutCtrl'
    // });

    // Set options third-party lib
    // toastrConfig.allowHtml = true;
    // toastrConfig.timeOut = 3000;
    // toastrConfig.positionClass = 'toast-bottom-right';
    // // toastrConfig.preventDuplicates = true;
    // toastrConfig.progressBar = true;
    $urlRouterProvider.otherwise('/home');
});
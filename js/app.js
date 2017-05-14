// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ui.router', 'ngStorage', 'controllers'])

// for title
.run(['$rootScope', '$state', '$stateParams',
    function($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }
])

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "templates/home.html",
            data : { pageTitle: 'Home' },
            controller: 'homeCtrl'
        })

    // if you have menu then routes like that
    // .state('app', {
    //    url: "/app",
    //    abstract: true,
    //    templateUrl: "templates/menu.html",
    //  })

    // .state('app.addContacts', {
    //   url: "/addContacts",
    //   views: {
    //     'menuContent': {
    //       templateUrl: "templates/addContacts.html",
    //       controller: 'addContactsCtrl'
    //     }
    //   }
    // })


    .state('addContacts', {
        url: "/addContacts",
        templateUrl: "templates/addContacts.html",
        data : { pageTitle: 'Add Contacts' },
        controller: 'addContactsCtrl'
    })
    .state('editContacts', {
        url: "/editContacts",
        templateUrl: "templates/editContacts.html",
        data : { pageTitle: 'Edit Contacts' },
        controller: 'editContactsCtrl'
    })


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/home');
});

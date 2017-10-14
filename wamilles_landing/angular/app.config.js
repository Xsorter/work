'use sctrict'

angular.module('app')
    .config([
        '$locationProvider',
        '$routeProvider',
        function config($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');
            $routeProvider.
           
            when('/admin', {
                template: '<admin></admin>'
            }).
            when('/', {
                template: '<content></content>'
            }).
            otherwise('/')
        }
])
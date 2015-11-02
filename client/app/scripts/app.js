'use strict';

/**
 * @ngdoc overview
 * @name friendsFeedApp
 * @description This is a simple angular app to mimic a news feed based on friendship (friends can see each other's posts)
 * # friendsFeedApp
 *
 * Main module of the application.
 */
angular
  .module('friendsFeedApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'restangular',
    'friendsFeedApp.services',
    'friendsFeedApp.directives'
  ])
  .constant("AppConfig", {
    "api_url": "http://localhost:3000",
    "image_server_url": "http://localhost:3000"
  })
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(function(RestangularProvider, AppConfig) {
    RestangularProvider.setBaseUrl(AppConfig.api_url);
    RestangularProvider.setRestangularFields({
      id: "_id"
    });
  });

angular.module('friendsFeedApp.services', []);
angular.module('friendsFeedApp.directives', []);
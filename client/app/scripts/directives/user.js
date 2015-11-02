'use strict';

angular.module('friendsFeedApp.directives')
  .directive('user', function(AppConfig) {
    return {
      restrict: 'E',
      scope: {
        user: '=',
        complete: '='
      },
      link: function(scope) {
        scope.imageServer = AppConfig.image_server_url; // expose this for image loading
      },
      templateUrl: 'views/templates/user.html'
    };
  });
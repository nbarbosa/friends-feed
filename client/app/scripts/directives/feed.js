'use strict';

angular.module('friendsFeedApp.directives')
  .directive('feed', function() {
    return {
      restrict: 'E',
      scope: {
        posts: '='
      },
      templateUrl: 'views/templates/feed.html'
    };
  });
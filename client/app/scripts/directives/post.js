'use strict';

angular.module('friendsFeedApp.directives')
  .directive('post', function() {
    return {
      restrict: 'E',
      scope: {
        post: '='
      },
      templateUrl: 'views/templates/post.html'
    };
  });
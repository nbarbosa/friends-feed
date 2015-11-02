'use strict';

angular.module('friendsFeedApp.directives')
  .directive('userList', function() {
    return {
      restrict: 'E',
      scope: {
        users: '=',
        clickCallback: '&userSelectFn'
      },
      link: function(scope) {
        scope.select = function(user) {
          scope.clickCallback({
            user: user
          });
        };
      },
      templateUrl: 'views/templates/user-list.html'
    };
  });
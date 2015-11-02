'use strict';
angular.module('friendsFeedApp.services')
  .factory('UserService', ['Restangular', function(Restangular) {

    var _userService = Restangular.all('users');
    return {
      all: function() {
        return _userService.getList();
      },
      get: function(id) {
        return Restangular.one('users', id).get();
      }
    };
  }]);
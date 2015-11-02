'use strict';
angular.module('friendsFeedApp.services')
  .factory('PostService', ['Restangular', function(Restangular) {

    var _postService = Restangular.all('posts');
    return {
      all: function(userId) {
        return _postService.getList({
          'userId': userId
        });
      },
      add: function(newPost) {
        return _postService.post(newPost);
      }
    };
  }]);
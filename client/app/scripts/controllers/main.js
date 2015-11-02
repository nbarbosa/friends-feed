'use strict';

/**
 * @ngdoc function
 * @name friendsFeedApp.controller:MainCtrl
 * @description Main controller of app with post form, feed, and list of friends
 * # MainCtrl
 * Controller of the friendsFeedApp
 */
angular.module('friendsFeedApp')
  .controller('MainCtrl', function($scope, UserService, PostService) {

    // read all users for initial choice
    UserService.all().then(function(users) {
      $scope.users = users;
    }, function(err) {
      console.log(err);
    });

    // select a user from the list
    $scope.pickUser = function(user) {
      UserService.get(user._id).then(function(user) {
        $scope.user = user;
      }, function(err) {
        console.log(err);
      });
    };

    // watch for user selected to load posts and be ready for new posts
    $scope.$watch('user', function() {

      if (typeof $scope.user !== 'undefined') {

        // load posts from friends and from myself
        PostService.all($scope.user._id).then(function(posts) {
          $scope.posts = posts;
        }, function(err) {
          console.log(err);
        });

        $scope.resetPost = function() {
          $scope.post = {
            userId: $scope.user._id,
            content: ''
          };
        };

        // clear post
        $scope.resetPost();

        // add a new post from myself
        $scope.addPost = function() {
          $scope.post.content = $scope.post.content.trim();
          if ($scope.post.content !== '') {
            PostService.add($scope.post).then(function(post) {
              $scope.posts.push(post);
              $scope.resetPost();
            }, function(err) {
              console.log(err);
            });
          }
        };
      }
    });
  });
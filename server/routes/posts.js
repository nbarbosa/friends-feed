var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var User = require('../models/user');


module.exports = function(app, router) {

  router.route('/posts')
    .post(function(req, res, next) {
      if (req.body.content.trim() !== '') {
        User.findById(req.body.userId, function(err, user) {

          if (err) { 
            console.log(err);
            return next({ friendlyMessage: 'Author not valid.'}); 
          }

          if (user !== null) {
            var post = new Post();
            post.user = user;
            post.content = req.body.content;

            post.save(function (err, post) {
              if (err) {
               console.log(err);
               return next({ friendlyMessage: 'Error saving post.'}); 
              }

              user.posts.push(post);
              user.save(function () {
                if (err) {
                  console.log(err);
                  return next({ friendlyMessage: 'Error saving post.'}); 
                }
                res.send(post);
              });
            });
          }
        });
      } else {
        return next({ friendlyMessage: 'Post cannot be empty.'}); 
      }
    })

    // /users?userId=x where x is the user for which their friends' + their own posts will be returned
    .get(function (req, res, next) {
      User.findById(req.query.userId, function(err, user) {

        if (err) {
          console.log(err);
          return next({ friendlyMessage: 'Invalid userId.'}); 
        }

        // by friends and by me
        var postsFromTheseUsers = user.friends.concat(user.id);
        if (user !== null) {
          Post.find( {user: {$in: postsFromTheseUsers } })
            .populate('user')
            .exec(function (err, posts) {
            if (err) {
             console.log(err);
             return next({ friendlyMessage: 'Error obtaining posts.'}); 
            }

            if (posts !== null) { 
              res.send(posts);
            }
          });
        }

    });
  });
};
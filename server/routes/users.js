var express = require('express');
var router = express.Router();
var User = require('../models/user');


module.exports = function(app, router) {
  router.route('/users')
    .get(function(req, res, next) {
      User.find(function(err, users) {
        if (err) {
          console.log(err);
          return next({ friendlyMessage: 'Error obtaining user list.'}); 
        }

        if (users !== null) {
          res.send(users);
        }
      });
    });

  router.route('/users/:id')
    .get(function(req, res, next) {
      User.findById(req.params.id)
      .populate('friends')
      .exec(function(err, user) {
        if (err) {
          console.log(err);
          return next({ friendlyMessage: 'Error obtaining user data.'}); 
        }

        if (user !== null) {
          res.send(user);
        }
      });
    });
};
var express = require('express');
var path = require('path');

module.exports = function(app, router) {

    var router = express.Router();
    require('../routes/users')(app, router);
    require('../routes/posts')(app, router);
    app.use('/media', express.static('media'));
    app.use(router);
};
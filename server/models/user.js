var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: {
    first: {
      type: String,
      required: true
    },
    last: {
      type: String,
      required: true
    }
  },
  photo: {
    url: {
      type: String,
      required: false
    }
  },
  email: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  friends: [
  { type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  posts: [
  { type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }],
  createdOn: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', schema);
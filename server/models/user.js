'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.statics.authenticate = (username, password, cb) => {
  User.findOne({username: username}).exec((error, user) => {
    if (error) {
      cb(error);
    } else if (!user) {
      const err = new Error('User Not Found');
      err.status = 401;
      cb(err);
    } else {
      bcrypt.compare(password, user.password, (error, result) => {
        if (result === true) {
          cb(null, user);
        } else {
          cb();
        }
      });
    }
  });
}

UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) {
      next(err);
    } else {
      this.password = hash;
      next();
    }
  });
});

const User = mongoose.model('User', UserSchema);
module.exports = User;

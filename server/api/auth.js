'use strict';
const User = require('../models/user');
const express = require('express');
const router = express.Router();


class UserData {
  constructor(props) {
    this.username = props.username;
    this.password = props.password;
  }
}

router.post('/register', (req, res, next) => {
  let newUser = new UserData(req.body);
  User.create(newUser, (error, user) => {
    if (error) {
      const err = new Error()
      err.status = 404;
      next(err);
    } else {
      req.session.userId = user._id;
      res.sendStatus(200);
    }
  });
});

router.post('/login', (req, res, next) => {
  const {username, password} = req.body;
  User.authenticate(username, password, (error, user) => {
    if (error || !user) {
      next(error);
    } else {
      req.session.userId = user._id;
      res.sendStatus(200);
    }
  });
});

router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        next(err);
      } else {
        res.sendStatus(200);
      }
    });
  }
});


module.exports = router;

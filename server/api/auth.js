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

router.post('/register', (req, res) => {
  let newUser = new UserData(req.body);
  User.create(newUser, (error, user) => {
    if (error) {
      res.json(error);
    } else {
      console.log(user);
      res.json(user);
    }
  });
});

module.exports = router;

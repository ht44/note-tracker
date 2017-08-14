'use strict';
const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/', (req, res, next) => {
  if (req.session && req.session.userId) {
    User.findById(req.session.userId, (error, user) => {
      if (error || !user) {
        next(error);
      } else {
        res.json({id: user._id, username: user.username});
      }
    });
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;

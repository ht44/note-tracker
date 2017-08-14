'use strict';
const User = require('../models/user');
const loginRequired = require('../middleware').loginRequired;
const express = require('express');
const router = express.Router();

router.get('/:id', loginRequired, (req, res, next) => {
  if (req.session &&
      req.session.userId &&
      req.session.userId === req.params.id) {
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

router.put('/:id', loginRequired, (req, res, next) => {
  User.findById(req.params.id, (error, user) => {
    if (error) {
      next(error);
    } else {
      if (req.body.username) {
        user.username = req.body.username;
      }
      if (req.body.password) {
        user.password = req.body.password;
      }
      user.save((err, updatedUser) => {
        if (err) {
          next(err);
        } else {
          res.json({user: updatedUser});
        }
      });
    }
  });
});

router.delete('/:id', loginRequired, (req, res, next) => {
  User.findByIdAndRemove(req.params.id, (error, user) => {
    if (error) {
      next(error);
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;

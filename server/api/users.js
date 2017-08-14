'use strict';
const User = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/:id', (req, res, next) => {
  console.log(req.params.id);
})

router.put('/:id', (req, res, next) => {
  User.findById(req.params.id, (error, user) => {
    if (error) {
      next(error);
    } else {
      console.log(req.body);
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

router.delete('/:id', (req, res, next) => {
  User.findByIdAndRemove(req.params.id, (error, user) => {
    if (error) {
      next(error);
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;

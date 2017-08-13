'use strict';

const User = require('../models/user');
const Note = require('../models/note');
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {

  Note.find({'_author': req.session.userId}).exec((error, notes) => {
    if (error) {
      next(error);
    } else {
      res.json(notes);
    }
  });
});

module.exports = router;

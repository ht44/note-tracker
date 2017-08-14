'use strict';
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  if (req.session && req.session.userId) {
    res.sendStatus(200);
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;

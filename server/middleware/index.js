'use strict';

function loginRequired(req, res, next) {
  if (req.session && req.session.userId) {
    next();
  } else {
    const error = new Error('Must be logged in to view this page.');
    error.status = 401;
    next(error);
  }
}

function loggedIn(req, res, next) {
  if (req.session && req.session.userId) {
    res.redirect('/api/notebook');
  } else {
    next();
  }
}

module.exports = {
  loggedIn: loggedIn,
  loginRequired: loginRequired
};

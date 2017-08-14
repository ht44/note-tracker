'use strict';

const User = require('../models/user');
const Note = require('../models/note');
const express = require('express');
const router = express.Router();

class NoteData {
  constructor(author, note) {
    this._author = author;
    this.title = note.title;
    this.date = note.date;
  }
}

router.get('/', (req, res, next) => {

  Note.find({'_author': req.session.userId}).exec((error, notes) => {
    if (error) {
      next(error);
    } else {
      res.json({notes: notes});
    }
  });
});

router.post('/', (req, res, next) => {
  const newNote = new NoteData(req.session.userId, req.body);
  Note.create(newNote, (error, note) => {
    if (error) {
      next(error);
    } else {
      res.json({note: note});
    }
  });
});

module.exports = router;

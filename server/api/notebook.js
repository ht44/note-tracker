'use strict';

const User = require('../models/user');
const Note = require('../models/note');
const loginRequired = require('../middleware').loginRequired;
const express = require('express');
const router = express.Router();



class NoteData {
  constructor(author, note) {
    this._author = author;
    this.title = note.title;
    this.created = note.created;
  }
}

router.get('/', loginRequired, (req, res, next) => {

  Note.find({'_author': req.session.userId}).exec((error, notes) => {
    if (error) {
      next(error);
    } else {
      res.json({notes: notes});
    }
  });
});

router.post('/', loginRequired, (req, res, next) => {
  const newNote = new NoteData(req.session.userId, req.body);
  Note.create(newNote, (error, note) => {
    if (error) {
      next(error);
    } else {
      res.json({note: note});
    }
  });
});

router.put('/:id', loginRequired, (req, res, next) => {
  Note.findById(req.params.id, (err, note) => {
    if (err) {
      next(err);
    } else {
      if (req.body.title) {
        note.title = req.body.title;
      }
      if (req.body.body) {
        note.body = req.body.body;
      }
      note.save((err, updatedNote) => {
        if (err) {
          next(err);
        } else {
          res.json({note: updatedNote});
        }
      });
    }
  });
});

router.delete('/:id', loginRequired, (req, res, next) => {
  Note.findByIdAndRemove(req.params.id, (err, note) => {
    if (err) {
      next(err);
    } else {
      res.json({deleted: note._id});
    }
  });
});

module.exports = router;

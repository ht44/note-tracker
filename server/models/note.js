'use strict';
const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
  _author: {
    type: Number
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  body: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
});

const Note = mongoose.model('Note', NoteSchema);
module.exports = Note;

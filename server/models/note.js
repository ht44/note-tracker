'use strict';
const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
  _author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  body: {
    type: String
  },
  date: {
    type: String,
    required: true
  }
});

const Note = mongoose.model('Note', NoteSchema);
module.exports = Note;

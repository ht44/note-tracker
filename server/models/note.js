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
  created: {
    type: String,
    required: true
  },
  edited: {
    type: String
  }
});

const Note = mongoose.model('Note', NoteSchema);
module.exports = Note;

'use strict';
const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 8000;

const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const express = require('express');
const app = express();

const authRouter = require('./server/api/auth');
const notesRouter = require('./server/api/notes');

if (env === 'development') {
  app.use(morgan('dev'));
  mongoose.connect('mongodb://localhost:27017/note-tracker', {
    useMongoClient: true
  });
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(session({
  secret: 'GK58HB446L',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: db})
}));

app.use((req, res, next) => {
  console.log('id: ', req.session.userId);
  res.locals.currentUser = req.session.userId;
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(path.join(__dirname, 'client')));
app.use(express.static(path.join(__dirname, 'node_modules')));


app.use('/api/notebook', notesRouter);
app.use('/api', authRouter);

app.get('*', (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, 'client')});
});

app.use((req, res, next) => {
  const error = new Error('File Not Found');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json(err.message);
});

app.listen(port, () => {
  console.log('Running on port: ', port);
});

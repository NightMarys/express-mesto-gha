const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const cardsRouter = require('./routes/cards');
// const usersRouter = require('./routes/users');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133',
  };
  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/cards', require('./routes/cards'));
app.use('/users', require('./routes/users'));

app.listen(PORT);

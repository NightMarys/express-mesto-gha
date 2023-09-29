const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '65162926511f512b8ef9f086',
  };
  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/', require('./routes/cards'));
app.use('/', require('./routes/users'));

app.listen(PORT);
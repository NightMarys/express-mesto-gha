const User = require('../models/user');

module.exports.getUser = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: 'Нет пользователя с таким id' });
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).json({ message: 'Переданы некорректные данные.' });
      } else {
        res.status(500).json({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      } else { res.status(500).send({ message: 'На сервере произошла ошибка' }); }
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: 'Пользователь с указанным id не найден.' });
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        res.status(400).json({ message: 'Пользователь с указанным id не найден.' });
      } else if (err.name === 'ValidationError') {
        res.status(400).json({ message: 'Переданы некорректные данные при обновлении профиля.' });
      } else {
        res.status(500).json({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const owner = req.user._id;
  const avatar = req.body;

  User.findByIdAndUpdate(owner, { avatar }, { new: true })
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: 'Пользователь с указанным id не найден.' });
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        res.status(400).json({ message: 'Пользователь с указанным id не найден.' });
      } else if (err.name === 'ValidationError') {
        res.status(400).json({ message: 'Переданы некорректные данные при обновлении аватара.' });
      } else {
        res.status(500).json({ message: 'На сервере произошла ошибка' });
      }
    });
};

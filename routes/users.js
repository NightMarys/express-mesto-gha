const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUser, getUserById, createUser, updateAvatar, updateProfile, getCurrentUser,
} = require('../controllers/users');

router.get('/me', getCurrentUser);
router.get('/users', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
}), getUser);
router.get('/users/:userId', getUserById);
router.post('/users', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().required().regex(/https?:\/\/(\w{3}\.)?[1-9a-z\-.]{1,}\w\w(\/[1-90a-z.,_@%&?+=~/-]{1,}\/?)?#?/),
    email: Joi.string().email().required().min(2)
      .max(30),
    password: Joi.string().required().min(2),
  }),
}), createUser);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(/https?:\/\/(\w{3}\.)?[1-9a-z\-.]{1,}\w\w(\/[1-90a-z.,_@%&?+=~/-]{1,}\/?)?#?/),
  }),
}), updateAvatar);

module.exports = router;


/*
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUser, getUserById, updateAvatar, updateProfile, createUser,
} = require('../controllers/users');

// router.get('/me', getCurrentUser);
router.get('/users', getUser);
router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
}), getUserById);

router.post('/users', createUser);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfile);
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar:
  }),
}), updateAvatar);

module.exports = router;
*/
const router = require('express').Router();

const {
  getUser, getUserById, updateAvatar, updateProfile, getCurrentUser,
} = require('../controllers/users');

router.get('/me', getCurrentUser);
router.get('/users', getUser);
router.get('/users/:userId', getUserById);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;

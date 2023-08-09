const usersRouter = require('express').Router();
const auth = require('../middlewares/auth');
const {
  validationUserInfo,
  validationUserAvatar,
  validationUserId,
} = require('../middlewares/validation');

const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getUserInfo,
} = require('../controllers/users');

usersRouter.use(auth);
usersRouter.get('/', getUsers);
usersRouter.get('/me', getUserInfo);
usersRouter.get('/:id', validationUserId, getUserById);
usersRouter.patch('/me', validationUserInfo, updateUser);
usersRouter.patch('/me/avatar', validationUserAvatar, updateAvatar);

module.exports = usersRouter;

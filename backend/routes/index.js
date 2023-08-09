const router = require('express').Router();
const cookieParser = require('cookie-parser');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const NotFound = require('../errors/NotFound');
const {
  createUser,
  login,
  logout,
} = require('../controllers/users');

const {
  validationEmailAndPassword,
} = require('../middlewares/validation');

router.post('/signin', validationEmailAndPassword, login);
router.post('/signup', validationEmailAndPassword, createUser);
router.post('/signout', logout);
router.use(cookieParser());
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('*', (req, res, next) => {
  next(new NotFound('Неверный путь'));
});

module.exports = router;

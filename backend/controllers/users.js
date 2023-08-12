const validationError = require('mongoose').Error.ValidationError;
const castError = require('mongoose').Error.CastError;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');
const Conflict = require('../errors/Conflict');
const userModel = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res, next) => {
  userModel.find({})
    .then(((data) => res.send(data)))
    .catch((err) => next(err));
};

module.exports.getUserById = (req, res, next) => {
  userModel.findById(req.params.id)
    .then(((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        next(new NotFound(`Пользователь по указанному id: ${req.params.id}, не найден`));
      }
    }))
    .catch((err) => {
      if (err instanceof castError) {
        next(new BadRequest('Передан некорректный id'));
      } else {
        next(err);
      }
    });
};
module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      userModel.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then(((user) => {
          const userWithoutPassword = user.toObject();
          delete userWithoutPassword.password;
          res.send({ data: userWithoutPassword });
        }))
        .catch((err) => {
          if (err.code === 11000) {
            next(new Conflict('Пользователь с данным Email`ом существует'));
          }
          if (err instanceof validationError) {
            next(new BadRequest('Переданы некорректные данные при создании пользователя'));
          } else {
            next(err);
          }
        });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  userModel.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then(((user) => res.send(user)))
    .catch((err) => {
      if (err instanceof validationError) {
        next(new BadRequest('Переданы некорректные данные при обновлении профиля'));
      } else {
        next(err);
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  userModel.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then(((user) => res.send(user)))
    .catch((err) => {
      if (err instanceof validationError) {
        next(new BadRequest('Переданы некорректные данные при обновлении аватвра'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  userModel.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      const userAgent = req.get('User-Agent');
      const regEx = /Chrome\/\d+/;
      const chromeVersion = userAgent.match(regEx).toString().replace('Chrome/', '');
      if (chromeVersion && chromeVersion > 80) {
        res.cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: 'None',
          secure: true,
        });
      } else {
        res.cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: 'Strict',
        });
      }
      res.send({ jwt: token })
        .end();
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.getUserInfo = (req, res, next) => {
  userModel.findById(req.user._id)
    .then(((data) => res.send(data)))
    .catch((err) => next(err));
};

module.exports.logout = (req, res) => {
  res.clearCookie('jwt', {
    sameSite: 'none',
    secure: true,
  })
    .send({ message: 'Выход' });
};

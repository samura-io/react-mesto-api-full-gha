const validationError = require('mongoose').Error.ValidationError;
const castError = require('mongoose').Error.CastError;
const cardModel = require('../models/card');
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');

module.exports.getCards = (req, res, next) => {
  cardModel.find({})
    .then((data) => res.send(data))
    .catch((err) => next(err));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  cardModel.create({ name, link, owner: req.user })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err instanceof validationError) {
        next(new BadRequest('Переданы некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};
module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  cardModel.findById(cardId)
    .then((card) => {
      if (card === null) {
        return next(new NotFound(`Карточка с указанном id: ${cardId}, не найдена`));
      }
      if (!(card.owner.toString() === req.user._id)) {
        return next(new Forbidden('Вы не можете удалять чужие карточки'));
      }
      cardModel.findByIdAndRemove(cardId)
        .then((data) => {
          if (data) {
            return res.send({ message: 'Карточка удалена' });
          }
        })
        .catch((err) => {
          if (err instanceof castError) {
            next(new BadRequest('Некорректный id карточки'));
          } else { next(err); }
        });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        next(new NotFound(`Передан несуществующий id: ${req.params.cardId} карточки`));
      }
    })
    .catch((err) => {
      if (err instanceof castError) {
        next(new BadRequest('Передан некорректный id карточки'));
      } else {
        next(err);
      }
    });
};

module.exports.unlikeCard = (req, res, next) => {
  cardModel.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        next(new NotFound(`Передан несуществующий id: ${req.params.cardId} карточки`));
      }
    })
    .catch((err) => {
      if (err instanceof castError) {
        next(new BadRequest('Передан некорректный id карточки'));
      } else {
        next(err);
      }
    });
};

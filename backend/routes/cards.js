const cardsRouter = require('express').Router();
const auth = require('../middlewares/auth');
const {
  validationCardInfo,
  validationCardId,
} = require('../middlewares/validation');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
} = require('../controllers/cards');

cardsRouter.use(auth);
cardsRouter.get('/', getCards);
cardsRouter.post('/', validationCardInfo, createCard);
cardsRouter.delete('/:cardId', validationCardId, deleteCard);
cardsRouter.put('/:cardId/likes', validationCardId, likeCard);
cardsRouter.delete('/:cardId/likes', validationCardId, unlikeCard);

module.exports = cardsRouter;

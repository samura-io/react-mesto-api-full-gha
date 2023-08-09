import React from "react";

function Card({card, onCardClick, userId, onCardLike, onCardDelete}){
    const isOwn = card.owner._id === userId;
    const isLiked = card.likes.some((i)=> i._id === userId);
    const cardLikeButton = (`card__like-button ${isLiked && 'card__like-button_active'}`);

    const handleClick = () => {
        onCardClick(card);
      } 

    const handleLike = () => {
        onCardLike(card);
    }

    const handleDelete = () => {
        onCardDelete(card._id);
    }

    return (
        <div>
            <article className="card">
            <img className="card__image" alt={card.name} src={card.link} onClick={handleClick}/>
            {isOwn && <button className="card__trash" type="button" aria-label="Удалить" onClick={handleDelete}></button>}
            <div className="card__container">
                <h2 className="card__name">{card.name}</h2>
                <button className={cardLikeButton} type="button" aria-label="Нравится" onClick={handleLike}></button>
                <span className="card__like-counter">{card.likes.length}</span>
            </div>
            </article>
        </div>
    )
}

export default Card
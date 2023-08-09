import React, { useContext } from "react";
import Card from "./Card.js";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { InitialCardsContext } from "../contexts/InitialCardsContext";

function Main(props) {
    const currentUserContext = React.useContext(CurrentUserContext);
    const initialCardsContext = React.useContext(InitialCardsContext);
    const userId = currentUserContext._id

    return (
        <main className="main">
          <section className="profile">
            <div className="profile__edit-img" onClick={props.onEditAvatar}>
              <img className="profile__img" src={currentUserContext.avatar} alt="Изображение профиля" />
            </div>
            <div className="profile__container">
              <h1 className="profile__name">{currentUserContext.name}</h1>
              <button className="profile__button profile__edit-button" 
              type="button" aria-label="Редактировать" 
              onClick={props.onEditProfile}></button>
            </div>
            <p className="profile__profession">{currentUserContext.about}</p>
            <button className="profile__button profile__add-button" type="button" 
            aria-label="Добавить изображение"
            onClick={props.onAddPlace}></button>
          </section>
          <section className="cards">
            {initialCardsContext.map((card)=> (
              <Card 
              key= {card._id}
              card={card} 
              onCardClick = {props.onCardClick}
              userId = {userId}
              onCardLike={props.onCardLike}
              onCardDelete= {props.onCardDelete}/>
            ))}
          </section>
        </main>
    )
}

export default Main
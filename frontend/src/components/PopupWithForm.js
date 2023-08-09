import React from "react";

function PopupWithForm(props) {

  return (
      <div className={`popup popup_content_${props.name} ${props.isOpen&&'popup_opened'}`}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={props.isClose}></button>
        <h3 className="popup__title">{props.title}</h3>
        <form className={`popup__form popup__form_type_${props.name}`} name={props.name} noValidate onSubmit={props.onSubmit}>
            {props.children}
            <button type="submit" className="popup__save-button" aria-label="Создать" disabled={props.isLoading}>{props.buttonText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm
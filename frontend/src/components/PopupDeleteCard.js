function PopupDeleteCard({isOpen, isClose, onDeleteCard, isLoading}) {

    const handleDeleteCard = (e) => {
        e.preventDefault();
        onDeleteCard();
    }

    return (
    <div className={`popup popup_delete-card ${isOpen&&'popup_opened'}`}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={isClose}></button>
        <h3 className="popup__title">Вы уверены?</h3>
        <form className="popup__form popup__form_type_confirm" name="confirm" onSubmit={handleDeleteCard}>
          <button type="submit" className="popup__confirm-button" aria-label="Да" disabled={isLoading}>{isLoading?'Удаление...':'Да'}</button>
        </form>
        </div>
    </div>
    )
}

export default PopupDeleteCard;
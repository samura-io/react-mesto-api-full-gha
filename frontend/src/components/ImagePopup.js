function ImagePopup (props) {

    const isRenderer = props.card

    return (
        <div className={`popup popup_zoom_active popup_content_image ${isRenderer?"popup_opened":''}`}>
            <div className="popup__image-container">
                <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
                <img className="popup__image" src={`${isRenderer?props.card.link:''}`} alt={`${isRenderer?props.card.name:''}`} />
                <p className="popup__caption">{`${isRenderer?props.card.name:''}`}</p>
            </div>
        </div> 
    )
}

export default ImagePopup
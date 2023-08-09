import successImage from "../images/success.svg";
import failImage from "../images/fail.svg";

function InfoTooltip({isOpen, isClose, result}) {

    return (
    <div className={`popup popup_info-tooltip ${isOpen&&'popup_opened'}`}>
        <div className="popup__container">
            <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={isClose}></button>
        <div className="popup__indicator" style={result?{backgroundImage: `url(${successImage})`}:{backgroundImage: `url(${failImage})`}} />
            <h3 className="popup__title popup__title_type_info-tooltip">{result?"Вы успешно зарегистрировались!":"Что-то пошло не так! Попробуйте ещё раз."}</h3>
        </div>
    </div>
    )
}

export default InfoTooltip
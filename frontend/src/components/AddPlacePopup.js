import PopupWithForm from './PopupWithForm'
import React from 'react';

function AddPlacePopup({isOpen, isClose, onAddPlace, isLoading}) {
    const [place, setPlace] = React.useState('');
    const [link, setLink] = React.useState('');

    React.useEffect(() => {
        setPlace('');
        setLink('');
      }, [isOpen]);

    const handleChangePlace = (e) => {
        setPlace(e.target.value)
    }

    const handleChangeLink = (e) => {
        setLink(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddPlace({
            name: place,
            link: link
        });
    }

    return (
        <PopupWithForm 
        isOpen={isOpen}
        isClose={isClose}
        onSubmit={handleSubmit}
        buttonText = {isLoading?'Сохранение...':'Создать'}
        name = 'Place'
        title = 'Новое место'
        isLoading = {isLoading}>
            <input className="popup__input popup__input_value_place" type="text"
                placeholder="Название" name="name" minLength="2" maxLength="30" id="name"
                value={place} required onChange={handleChangePlace} />
            <span className="popup__input-error name-error"></span>
                
            <input className="popup__input popup__input_value_link" type="url" placeholder="Ссылка на картинку" 
                name="link" id="link" required onChange={handleChangeLink} value={link}/>
                <span className="popup__input-error link-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;
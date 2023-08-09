import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, isClose, onUpdateUser, isLoading}){
    const currentUserContext = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        setName(`${currentUserContext.name}`);
        setDescription(`${currentUserContext.about}`);
      }, [currentUserContext, isOpen]);

    const handleChangeName = (e) => {
        setName(e.target.value)
    }
    const handleChangeDescription = (e) => {
        setDescription(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateUser({
            name: name, 
            about: description
        })
    }

    return (
    <PopupWithForm 
    onSubmit={handleSubmit}
    isOpen={isOpen}
    isClose = {isClose}
    buttonText = {isLoading?'Сохранение...':'Сохранить'}
    name = 'Profile'
    title = 'Редактировать профиль'
    isLoading = {isLoading}>
        <input className="popup__input popup__input_value_name" type="text" required
            placeholder="Имя" name="username" id="username" minLength="2" maxLength="40" value={name} onChange={handleChangeName}/>
        <span className="popup__input-error username-error"></span>
            
        <input className="popup__input popup__input_value_profession" type="text" required
            placeholder="О себе" name="profession" id="profession"  minLength="2" maxLength="200" value={description} onChange={handleChangeDescription}/>
        <span className="popup__input-error profession-error"></span>
    </PopupWithForm> )
}

export default EditProfilePopup;

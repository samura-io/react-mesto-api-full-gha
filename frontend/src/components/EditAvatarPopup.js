import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup({onUpdateAvatar, isOpen, isClose, isLoading}) {
    const avavtarRef = React.useRef();

    React.useEffect(() => {
        avavtarRef.current.value=''
      }, [isOpen]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateAvatar(avavtarRef.current.value);
    }

    return (
        <PopupWithForm 
          onSubmit={handleSubmit}
          isOpen={isOpen}
          isClose = {isClose}
          buttonText = {isLoading?'Сохранение...':'Сохранить'}
          name = 'avatar'
          title = 'Обновить аватар'
          isLoading = {isLoading}>
            <input ref={avavtarRef} className="popup__input popup__input_value_avatar" type="url" placeholder="Ссылка на изображение" 
                name="avatar" id="avatar" required/>
            <span className="popup__input-error avatar-error"></span>
          </PopupWithForm>
    )
}

export default EditAvatarPopup;

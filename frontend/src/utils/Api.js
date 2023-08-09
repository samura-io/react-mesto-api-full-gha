import { apiConfig } from "./constants";

class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
    }

    _checkResponse = (res) => {
            if (res.ok) {
                return res.json()
            } else {
                return Promise.reject(`Ошибка: ${res.status}`)
            };
    };

    getUserInfo() {
        return fetch(this._baseUrl + '/users/me', {
            headers: this._headers
        })
        .then(this._checkResponse);
    };
  
    getInitialCards() {
        return fetch(this._baseUrl + '/cards ', {
            headers: this._headers
        })
        .then(this._checkResponse);
    };

    editUserInfo(name, about) {
        return fetch(this._baseUrl + '/users/me', {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
        .then(this._checkResponse);
    };

    addCard(data) {
        return fetch(this._baseUrl + '/cards', {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then(this._checkResponse);
    };

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        })
        .then(this._checkResponse);
    };

    changeLikeCardStatus(CardId, isLiked) {
        return isLiked ? this.dislikeCard(CardId) : this.likeCard(CardId);
    }

    likeCard(CardId){
        return fetch(`${this._baseUrl}/cards/${CardId}/likes`, {
            method: "PUT",
            headers: this._headers,
        })
        .then(this._checkResponse); 
    };

    dislikeCard(CardId){
        return fetch(`${this._baseUrl}/cards/${CardId}/likes`, {
            method: "DELETE",
            headers: this._headers,
        })
        .then(this._checkResponse);
    };

    avatarEdit(link){
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: link
            })
        })
        .then(this._checkResponse);
    };
  
}

export default new Api(apiConfig)

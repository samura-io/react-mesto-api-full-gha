class Auth {
    constructor(){
        this._baseUrl = 'https://api.samura.io.nomoreparties.co';
        // this._baseUrl = 'https://api.samura.io.nomoreparties.co';
        this._headers = {
            'Content-Type': 'application/json'
        }
    }

    _checkResponse = (res) => {
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(`Ошибка: ${res.status}`)
        };
};

    register(email, password) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                "password": password,
                "email": email,
            })
        }).then(this._checkResponse);
    }

    login(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify({
                "password": password,
                "email": email,
            })
        }).then(this._checkResponse);
    }

    logout() {
        return fetch(`${this._baseUrl}/signout`, {
            method: 'GET',
            credentials: 'include',
        }).then(this._checkResponse);
    }

    checkAuth() {
        return fetch(`${this._baseUrl}/users/me`, {
            credentials: 'include',
            method: 'GET',
        }).then(this._checkResponse);
    }
}

export default new Auth();
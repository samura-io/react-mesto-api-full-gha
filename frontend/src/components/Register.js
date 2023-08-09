import { Link } from 'react-router-dom';
import React from 'react';

function Register({onSubmit}) {
    const [registerValue, setRegisterValue] = React.useState({
        'email':'',
        'password':''
    })

    const handleEmailChange = (e) => {
        setRegisterValue({...registerValue, 'email': e.target.value});
    }

    const handlePasswordChange = (e) => {
        setRegisterValue({...registerValue, 'password': e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(registerValue);
    }

    return (
        <div className="register">
            <div className="register__container">
                <h3 className="register__title">Регистрация</h3>
                <form className="register__form" name="register" onSubmit={handleSubmit}>
                    
                    <input className="register__input register__input_value_email" type="email" required 
                    placeholder="Email" name="email" id="email" onChange={handleEmailChange} value={registerValue['email']}/>
                    <span className="register__input-error"></span>
                    
                    <input className="register__input register__input_value_password" type="text" required
                    placeholder="Пароль" name="password" id="password" onChange={handlePasswordChange} value={registerValue['password']}/>
                    <span className="register__input-error"></span>
                    
                    <button type="submit" className="register__submit" aria-label="Войти">Зарегистрироваться</button>
                </form>
                <span className='register__signature'> Уже зарегистрированы? <Link className='register__link' to='/sign-in'>Войти</Link></span>
            </div>
        </div>
    )
}

export default Register
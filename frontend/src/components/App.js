import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import AddPlacePopup from './AddPlacePopup'
import ImagePopup from "./ImagePopup.js";
import api from '../utils/Api'
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { InitialCardsContext } from "../contexts/InitialCardsContext";
import PopupDeleteCard from "./PopupDeleteCard";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from './InfoTooltip';
import PageNotFound from './PageNotFound';
import ProtectedRouteElement from "./ProtectedRoute";
import auth from '../utils/Auth'

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [registrationResult, setRegistrationResult] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [idDeleteCard, setIdDeleteCard] = React.useState(''); // также открывает попап, если стейт не пустой
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isRenderLoading, setIsrenderLoading] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('')
  const navigate = useNavigate();


  React.useEffect(()=>{
    api.getUserInfo().then((res)=>{
      setCurrentUser(res);
    }).catch((err)=>{console.log(err)});
    api.getInitialCards().then((res)=>{
      setCards(res);
    }).catch((err)=>{console.log(err)});
    handleTokenCheck();
  }, [])

  const handleInfoTooltipOpen = () => {
    setIsInfoTooltipOpen(true);
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);

  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }

  const handleCardClick = (selectedCard) => {
    setSelectedCard(selectedCard);
  }

  const handleDeleteCard = () => {
      setIsrenderLoading(true);
      api.deleteCard(idDeleteCard).then(()=>{
        setCards((state) => state.filter((c)=> idDeleteCard !== c._id));
        setIdDeleteCard('');
        setIsrenderLoading(false);
      }).catch((err)=>{console.log(err)}) 
  }

  const handleOpenPopupDelete = (cardId) => {
      setIdDeleteCard(cardId);
    }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked).then((newCard)=>{
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    }).catch((err)=>{console.log(err)});
  }

  const handleUpdeteUser = (data) => {
    setIsrenderLoading(true);
    api.editUserInfo(data.name, data.about).then((res)=>{
      setCurrentUser(res);
      closeAllPopups();
      setIsrenderLoading(false);
    }).catch((err)=>{console.log(err)});
  }

  const handleUpdeteAvatar = (link) => {
    setIsrenderLoading(true);
    api.avatarEdit(link).then((res)=>{
      setCurrentUser(res);
      closeAllPopups();
      setIsrenderLoading(false);
    }).catch((err)=>{console.log(err)});
  }

  const handleAddPlaceSubmit = (data) =>{
    setIsrenderLoading(true);
    api.addCard(data).then((res)=>{
      setCards([res, ...cards]);
      closeAllPopups();
      setIsrenderLoading(false);
    }).catch((err)=>{console.log(err)});
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIdDeleteCard('');
    setIsInfoTooltipOpen(false)
  }

  const handleRegistration = (registerData) => {
    auth.register(registerData.email, registerData.password)
      .then((res)=>{
      navigate('/sign-in', {replace:true})
      setRegistrationResult(true);
      handleInfoTooltipOpen();
    })
    .catch((err)=>{
      console.log(err);
      setRegistrationResult(false);
      handleInfoTooltipOpen()})
  };

  const handleLogin = (loginData) => {
    auth.login(loginData.email, loginData.password).then((res)=>{
      localStorage.setItem('token', res.token);
      handleTokenCheck();
    })
    .catch((err)=>{
      console.log(err);
      setRegistrationResult(false);
      handleInfoTooltipOpen()})
  }

  const handleTokenCheck = () => {
    if (localStorage.getItem('token')){
      const token = localStorage.getItem('token');
      auth.checkToken(token).then((res)=>{
        navigate('/', {replace:true});
        setLoggedIn(true);
        setEmail(res.data.email)})
      .catch((err)=>{
        console.log(err)
      })
    }
  }

  const handleExit = () => {
    localStorage.removeItem('token');
    setEmail('');
    setLoggedIn(false)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <InitialCardsContext.Provider value={cards}>
        <div className="App">

          <Header 
            email={email}
            onExit = {handleExit}
          />

          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRouteElement
                  element={Main}
                  loggedIn={loggedIn}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleOpenPopupDelete}
                />
              }
            />
            <Route path='/sign-up' element={
              <Register 
              onSubmit = {handleRegistration}/>
            } />
            <Route path='/sign-in' element={
              <Login 
              onSubmit= {handleLogin}/>
            }/>
            <Route path='*' element={
              <PageNotFound />
            }/>
          </Routes>
          <Footer />

          <InfoTooltip 
          isOpen={isInfoTooltipOpen}
          isClose={closeAllPopups}
          result = {registrationResult}/>

          <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen}
          isClose = {closeAllPopups}
          onUpdateAvatar={handleUpdeteAvatar}
          isLoading = {isRenderLoading}/>

          <EditProfilePopup 
          isOpen={isEditProfilePopupOpen}
          isClose = {closeAllPopups}
          onUpdateUser={handleUpdeteUser}
          isLoading = {isRenderLoading} />

          <AddPlacePopup 
          isOpen={isAddPlacePopupOpen}
          isClose = {closeAllPopups}
          onAddPlace = {handleAddPlaceSubmit}
          isLoading = {isRenderLoading}/>
    
          <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups} />

          <PopupDeleteCard 
          isOpen={idDeleteCard}
          isClose={closeAllPopups}
          onDeleteCard = {handleDeleteCard}
          isLoading = {isRenderLoading}/>
        </div>

      </InitialCardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
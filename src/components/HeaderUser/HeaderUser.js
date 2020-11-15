import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ContactsList from '../ContactsList/ContactsList';
import styles from './HeaderUser.module.css';
import defaultAvatar from './leo.png';
import { GoogleLogout } from 'react-google-login';
import { fetchRandomImages } from '../../services/randomAnswerApi';
import { v4 } from 'uuid';
import routes from '../../services/routes';
import {
  setAccessToken,
  setImgUser,
  setNameUser,
  addNewContact,
  changeFilter,
} from '../../redux/slice';
import { Search, Exit } from '../../images/sprite';

const HeaderUser = () => {
  const [imgAvatar, setImgAvatar] = useState(null);
  const contacts = useSelector(state => state.contacts);
  const valueFilter = useSelector(state => state.action.filter);
  const imgUser = useSelector(state => state.session.imgUser);
  const nameUser = useSelector(state => state.session.nameUser);
  const dispatch = useDispatch();

  fetchRandomImages().then(result =>
    setImgAvatar(
      `https://image.tmdb.org/t/p/w138_and_h175_face${
        result ? result : '/27C77ni5XmlgkJVbomXPC4tHWVd.jpg'
      }`,
    ),
  );

  const addContact = () => {
    const repeatContact = contacts.find(c => c.name === valueFilter);
    if (valueFilter.replace(/\s/g, '') === '' || repeatContact) {
      alert('некоректні дані!');
    } else {
      const contact = {
        id: v4(),
        name: valueFilter,
        historyM: [],
        img: imgAvatar,
        date: Date.now(),
      };

      dispatch(addNewContact(contact));
    }
  };

  const logout = () => {
    dispatch(setAccessToken(''));
    dispatch(setImgUser(null));
    dispatch(setNameUser(''));
  };
  const handleLogoutFailure = () => {
    alert('Failed to log out');
  };
  const CLIENT_ID =
    '1025667457262-dt6vresakr191gvfve3q1cdga5255ufr.apps.googleusercontent.com';

  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerContainer}>
          <img
            src={imgUser ? imgUser : defaultAvatar}
            alt={nameUser}
            className={styles.image}
          />
          <p className={styles.userName}>{nameUser}</p>

          <GoogleLogout
            className={styles.logoutButton}
            clientId={CLIENT_ID}
            buttonText=""
            onLogoutSuccess={logout}
            onFailure={handleLogoutFailure}
          >
            <Exit scale="30" />
          </GoogleLogout>
        </div>
        <form
          onSubmit={() => {
            addContact();
          }}
          autoComplete="off"
          className={styles.form}
        >
          <input
            required
            placeholder="Search or start new chat"
            className={styles.input}
            type="text"
            value={valueFilter}
            onChange={e => dispatch(changeFilter(e.target.value))}
          />
          <button className={styles.button}>
            <Search />
          </button>
        </form>
      </div>
      <Route path={routes.contact} component={ContactsList} />
    </>
  );
};

export default HeaderUser;

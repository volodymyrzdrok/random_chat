import React, { useState } from 'react';
import styles from './HeaderUser.module.css';
import ContactsList from '../ContactsList/ContactsList';
import { Route } from 'react-router-dom';
// import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { v4 } from 'uuid';
import { fetchRandomImages } from '../../services/randomAnswerApi';
import { addNewContact, changeFilter } from '../../redux/slice';
import routes from '../../services/routes';
import { GoogleLogout } from 'react-google-login';
import { setAccessToken, setImgUser, setNameUser } from '../../redux/slice';
import { Search } from '../../images/sprite';
import { Exit } from '../../images/sprite';
import defaultAvatar from './leo.png';

const HeaderUser = () => {
  const CLIENT_ID =
    '1025667457262-dt6vresakr191gvfve3q1cdga5255ufr.apps.googleusercontent.com';

  const [imgAvatar, setImgAvatar] = useState(null);
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);
  const valueFilter = useSelector(state => state.filter);
  const imgUser = useSelector(state => state.session.imgUser);
  const nameUser = useSelector(state => state.session.nameUser);

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
      // valueFilter = '';
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
      <Route
        path={routes.contact}
        component={ContactsList}
        // addContact={addContact}
      />
      {/* <ContactsList /> */}
    </>
  );
};

export default HeaderUser;

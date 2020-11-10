import React, { useEffect, useState, useCallback } from 'react';
import styles from './HeaderUser.module.css';
import avatar from './leo.png';
import { useDispatch } from 'react-redux';
import { v4 } from 'uuid';
import { fetchRandomImages } from '../../services/randomAnswerApi';
import { addNewContact } from '../../redux/slice';

const HeaderUser = ({ contacts }) => {
  const [imgAvatar, setImgAvatar] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchRandomImages().then(result => setImgAvatar(result));
  }, [contacts]);

  const addContact = e => {
    // e.preventDefault();
    const contact = {
      id: v4(),
      name: e.target[0].value,
      historyM: [],
      img: imgAvatar,
      date: Date.now(),
    };

    dispatch(addNewContact(contact));

    e.target[0].value = '';
  };

  return (
    <div className={styles.header}>
      {/* <div className={styles.headerContainer}>
        <img src={avatar} alt="avatar" className={styles.image} />
        <p className={styles.userName}>userName</p>
        <button className={styles.logout}>logout</button>
      </div> */}
      <form
        onSubmit={e => {
          addContact(e);
        }}
        autoComplete="off"
        className={styles.form}
      >
        <label className={styles.label}>
          Search or start new chat
          <br />
          <input
            className={styles.input}
            type="text"
            // value=
            // onChange={e => dispatch((e.target.value))}
          />
        </label>
      </form>
    </div>
  );
};

export default HeaderUser;

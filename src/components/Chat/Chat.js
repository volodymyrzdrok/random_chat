import React, { useState, useEffect } from 'react';
import styles from './Chat.module.css';
import { useLocation } from 'react-router-dom';
import { fetchRandomAnswer } from '../../services/randomAnswerApi';
import { useSelector, useDispatch } from 'react-redux';
import { addNewMessage, removeContact } from '../../redux/slice';
import { v4 } from 'uuid';
import moment from 'moment';
import { DeleteMessage, DeleteContact, Telegram } from '../../images/sprite';

const Chat = () => {
  const contacts = useSelector(state => state.contacts);
  const [randomMessage, setRandomMessage] = useState(null);
  const dispatch = useDispatch();
  let location = useLocation();
  const contactId = location.pathname.slice(7);

  const contact = contacts.find(contact => String(contact.id) === contactId);

  const [randomObject, setRandomObject] = useState(null);

  fetchRandomAnswer().then(result => setRandomMessage(result));

  useEffect(() => {
    if (randomObject)
      setTimeout(() => {
        const historyM = [...contact.historyM, randomObject];
        const contactUpdate = { ...contact, historyM };
        dispatch(addNewMessage(contactUpdate));

        setRandomObject(null);
      }, 3000);
  }, [randomObject]);

  const addMessage = e => {
    e.preventDefault();
    if (e.target[0].value.replace(/\s/g, '') === '') {
      alert('некоректні дані!');
    } else {
      const messageNew = {
        id: Date.now(),
        message: e.target[0].value,
        date: Date.now(),
      };
      e.target[0].value = '';
      const historyM = [...contact.historyM, messageNew];
      const contactUpdate = { ...contact, historyM };
      dispatch(addNewMessage(contactUpdate));
      setRandomObject({
        id: v4(),
        message: randomMessage,
        date: Date.now(),
        bot: true,
      });
    }
  };

  const deleteContact = id => {
    dispatch(removeContact(id));
  };

  const deleteHistoryM = () => {
    const historyM = [];
    const contactUpdate = { ...contact, historyM };
    dispatch(addNewMessage(contactUpdate));
  };

  return (
    <>
      {contact && (
        <div className={styles.chatContainer}>
          <div className={styles.titleContainer}>
            <img
              className={styles.titleImg}
              src={contact.img}
              alt={contact.name}
              width="50"
            />
            <h3 className={styles.titleName}>{contact.name}</h3>
            <div className={styles.titleButtons}>
              <button
                onClick={() => deleteHistoryM()}
                className={styles.titleButton}
              >
                <DeleteMessage scale="40" />
              </button>
              <button
                onClick={() => deleteContact(contact.id)}
                className={styles.titleButton}
              >
                <DeleteContact scale="45" />
              </button>
            </div>
          </div>
          <ul className={styles.list}>
            {contact.historyM.length > 0 &&
              contact.historyM.map(item => (
                <li
                  key={item.id}
                  className={item.bot ? styles.itemBot : styles.itemMyMessage}
                >
                  <div
                    className={
                      item.bot
                        ? styles.itemTextImgContainer
                        : styles.itemTextNOImgContainer
                    }
                  >
                    {item.bot && (
                      <img
                        className={styles.itemImg}
                        src={contact.img}
                        alt={contact.name}
                      />
                    )}

                    <p
                      className={
                        item.bot ? styles.itemTextBot : styles.itemTextMy
                      }
                    >
                      {item.message}
                    </p>
                  </div>
                  <span
                    className={item.bot ? styles.itemDataBot : styles.itemData}
                  >
                    {moment(item.date).format('l,LT ')}
                  </span>
                </li>
              ))}
          </ul>
          <form
            type="submit"
            onSubmit={e => {
              addMessage(e);
            }}
            autoComplete="off"
            className={styles.form}
          >
            <input
              required
              placeholder="Type your message"
              className={styles.input}
              type="text"
            />

            <button className={styles.buttonSend}>
              <Telegram scale="35" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chat;

import React, { useState, useEffect } from 'react';
import styles from './Chat.module.css';
import { useLocation } from 'react-router-dom';
import { fetchRandomAnswer } from '../../services/randomAnswerApi';
import { useSelector, useDispatch } from 'react-redux';
import { addNewMessage, removeContact } from '../../redux/slice';
import { v4 } from 'uuid';

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
            <div className="">
              <button
                onClick={() => deleteContact(contact.id)}
                className={styles.titleButton}
              >
                delete contact
              </button>
              <button
                onClick={() => deleteHistoryM()}
                className={styles.titleButton}
              >
                delete history
              </button>
            </div>
          </div>
          <ul className={styles.list}>
            {contact.historyM.length > 0 &&
              contact.historyM.map(item => (
                <li
                  key={item.id}
                  className={item.bot ? styles.item : styles.itemMyMessage}
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
                      item.bot ? styles.itemTextMyMessage : styles.itemText
                    }
                  >
                    {item.message}
                  </p>
                  <span className={styles.itemData}>
                    {new Date(item.date).toLocaleString()}
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

            <button className={styles.button}>send</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chat;

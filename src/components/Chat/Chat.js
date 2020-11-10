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
  const contactId = location.pathname.slice(9);
  const contact = contacts.find(contact => String(contact.id) === contactId);

  useEffect(() => {
    fetchRandomAnswer().then(result => setRandomMessage(result));
  }, [contact]);

  const addMessage = e => {
    e.preventDefault();
    const messageNew = {
      id: Date.now(),
      message: e.target[0].value,
      date: Date.now(),
    };
    const messageNewBot = {
      id: v4(),
      message: randomMessage,
      date: Date.now(),
      bot: true,
    };
    e.target[0].value = '';

    const historyM = [...contact.historyM, messageNew];
    const contactUpdate = { ...contact, historyM };

    dispatch(addNewMessage(contactUpdate));

    setTimeout(() => {
      const historyM = [...contact.historyM, messageNewBot];
      const contactUpdate = { ...contact, historyM };
      dispatch(addNewMessage(contactUpdate));
      console.log('бот бот ', contact);
    }, 3000);

    console.log('юсер додав', contact);
  };

  const deleteContact = id => {
    dispatch(removeContact(id));
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
            <button
              onClick={() => deleteContact(contact.id)}
              className={styles.titleButton}
            >
              delete contact
            </button>
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
            <label className={styles.label}>
              type your message
              <input
                className={styles.input}
                type="text"
                // value=
                // onChange={e => dispatch((e.target.value))}
              />
            </label>
            <button className={styles.button}>send</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chat;

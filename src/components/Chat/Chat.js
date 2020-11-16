import React, { useState, useEffect } from 'react';
import styles from './Chat.module.css';
import { useLocation, useHistory } from 'react-router-dom';
import { fetchRandomAnswer } from '../../services/randomAnswerApi';
import { useSelector, useDispatch } from 'react-redux';
import { addNewMessage, removeContact, botTypingText } from '../../redux/slice';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { v4 } from 'uuid';
import moment from 'moment';
import {
  DeleteMessage,
  DeleteContact,
  Telegram,
  GoBack,
} from '../../images/sprite';
import Loader from '../Loader/Loader';
import routes from '../../services/routes';
import animation from './animation.module.css';
import animationBot from './animationBot.module.css';

const Chat = () => {
  const [randomMessage, setRandomMessage] = useState(null);
  const [randomObject, setRandomObject] = useState(null);
  const contacts = useSelector(state => state.contacts);
  const botType = useSelector(state => state.action.botType);
  const dispatch = useDispatch();
  let location = useLocation();
  let history = useHistory();
  const contactId = location.pathname.slice(6);
  const contact = contacts.find(contact => String(contact.id) === contactId);

  fetchRandomAnswer().then(result => setRandomMessage(result));

  useEffect(() => {
    if (randomObject) {
      setTimeout(() => {
        const historyM = [...contact.historyM, randomObject];
        const contactUpdate = { ...contact, historyM };
        dispatch(addNewMessage(contactUpdate));
        setRandomObject(null);
        dispatch(botTypingText(false));
        scrolling();
      }, 3000);
    }
  }, [randomObject]);

  const scrolling = () => {
    const ulka = document.querySelector('#ulScroll');
    ulka.scrollTop = 9999;
  };

  const addMessage = e => {
    e.preventDefault();
    scrolling();
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
      dispatch(botTypingText(true));
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
    hendleGoBack();
  };

  const deleteHistoryM = () => {
    const historyM = [];
    const contactUpdate = { ...contact, historyM };
    dispatch(addNewMessage(contactUpdate));
  };

  const hendleGoBack = () => {
    const { state } = location;

    if (state && state.from) {
      history.push(state.from);
    } else {
      history.push(routes.contact);
    }
  };

  const widthW = document.documentElement.clientWidth;

  return (
    <>
      {contact ? (
        <div className={styles.chatContainer}>
          <div className={styles.titleContainer}>
            {widthW < 860 && (
              <button className={styles.titleButton} onClick={hendleGoBack}>
                <GoBack scale="40" />
              </button>
            )}
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
                <DeleteMessage scale={widthW > 860 ? '40' : '25'} />
              </button>
              <button
                onClick={() => deleteContact(contact.id)}
                className={styles.titleButton}
              >
                <DeleteContact scale={widthW > 860 ? '45' : '30'} />
              </button>
            </div>
          </div>
          <TransitionGroup component="ul" className={styles.list} id="ulScroll">
            {contact.historyM.length > 0 &&
              contact.historyM.map(item => (
                <CSSTransition
                  key={item.id}
                  timeout={380}
                  classNames={item.bot ? animationBot : animation}
                >
                  <li
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
                      className={
                        item.bot ? styles.itemDataBot : styles.itemData
                      }
                    >
                      {moment(item.date).format('l,LT ')}
                    </span>
                  </li>
                </CSSTransition>
              ))}
          </TransitionGroup>
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
              <Telegram scale="45" />
            </button>
            {botType && (
              <div className={styles.botLoaderMessage} id="loaderContainer">
                <span className={styles.descriptionLoader}>
                  <b> {contact.name}</b> is now writing you a message
                </span>

                <Loader colorL="#115b9d" typeLoader={'ThreeDots'} scale={25} />
              </div>
            )}
          </form>
        </div>
      ) : (
        <div className={styles.bcContainer}>
          <h3 className={styles.bcTitle}>
            Please select a chat <br /> to start messaging
          </h3>
        </div>
      )}
    </>
  );
};

export default Chat;

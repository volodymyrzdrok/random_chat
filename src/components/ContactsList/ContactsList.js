import React from 'react';
import styles from './ContactsList.module.css';
import { useSelector } from 'react-redux';
import Chat from '../Chat/Chat';
import { Route, NavLink, useLocation } from 'react-router-dom';

const ContactsList = props => {
  const contacts = useSelector(state => state.contacts);
  let location = useLocation();
  const { url, path } = props.match;

  return (
    <div className={styles.chatContactslist}>
      <div className={styles.contactsList}>
        <h3 className={styles.title}>Chats</h3>
        <ul className={styles.list}>
          {contacts.map(({ id, img, name, historyM, date }) => (
            <li key={id}>
              <NavLink
                className={styles.item}
                to={{
                  pathname: `${url}/${id}`,
                  state: { from: location },
                }}
              >
                <img className={styles.image} src={img} alt={name} />
                <div className={styles.descContainer}>
                  <p className={styles.name}>{name}</p>
                  <p className={styles.description}>
                    {historyM.length > 0 &&
                      historyM[historyM.length - 1].message}
                  </p>
                </div>
                <span className={styles.date}>
                  {historyM.length > 0
                    ? new Date(
                        historyM[historyM.length - 1].date,
                      ).toLocaleDateString()
                    : new Date(date).toLocaleDateString()}
                </span>
              </NavLink>
              {/* <Route path={`${path}`} component={Chat} /> */}
            </li>
          ))}
        </ul>
      </div>
      {/* <Chat /> */}
      <Route path={`${path}`} component={Chat} />
    </div>
  );
};

export default ContactsList;

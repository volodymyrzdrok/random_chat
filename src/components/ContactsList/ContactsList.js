import React from 'react';
import styles from './ContactsList.module.css';
import { useSelector } from 'react-redux';
import Chat from '../Chat/Chat';
import { Route, NavLink, useLocation } from 'react-router-dom';
import routes from '../../services/routes';
import moment from 'moment';

const ContactsList = props => {
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase()),
  );

  let location = useLocation();
  const { url, path } = props.match;

  return (
    <div className={styles.chatContent}>
      <div className={styles.contactsList}>
        <ul className={styles.list}>
          <li>
            <NavLink to={routes.contact} className={styles.title}>
              Contacts
            </NavLink>
          </li>
          {visibleContacts.length === 0 && (
            <li>
              <p className={styles.title}>
                not found <b>{filter},</b>
                <br /> please click "Enter"
                <br /> or button to add a new contact
              </p>
            </li>
          )}

          {visibleContacts.map(({ id, img, name, historyM, date }) => (
            <li key={id}>
              <NavLink
                activeClassName={styles.itemActive}
                className={styles.item}
                to={{
                  pathname: `${url}/:${id}`,
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
                <p className={styles.date}>
                  {historyM.length > 0
                    ? moment(historyM[historyM.length - 1].date).format('ll')
                    : moment(date).format('ll')}
                </p>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <Route path={`${path}`} component={Chat} />
    </div>
  );
};

export default ContactsList;

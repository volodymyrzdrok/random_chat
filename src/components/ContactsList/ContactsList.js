import React from 'react';
import styles from './ContactsList.module.css';
import { useSelector } from 'react-redux';
import Chat from '../Chat/Chat';
import { Route, NavLink, useLocation } from 'react-router-dom';
import routes from '../../services/routes';

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
              {/* <h3 className={styles.title}>Contacts</h3> */}
            </NavLink>
          </li>
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
                    ? new Date(
                        historyM[historyM.length - 1].date,
                      ).toLocaleDateString()
                    : new Date(date).toLocaleDateString()}
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

import React from 'react';
import styles from './ContactsList.module.css';
import { Route, NavLink, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useSelector } from 'react-redux';
import Chat from '../Chat/Chat';
import routes from '../../services/routes';
import moment from 'moment';
import Loader from '../Loader/Loader';
import animation from './animation.module.css';

const ContactsList = props => {
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.action.filter);
  const botType = useSelector(state => state.action.botType);

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase()),
  );

  let location = useLocation();
  const { url, path } = props.match;

  const widthW = document.documentElement.clientWidth;
  return (
    <div className={styles.chatContent}>
      <div className={styles.contactsList}>
        <TransitionGroup component="ul" className={styles.list}>
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
            <CSSTransition key={id} timeout={380} classNames={animation}>
              <li>
                <NavLink
                  activeClassName={styles.itemActive}
                  className={styles.item}
                  to={{
                    pathname: `${url}/${id}`,
                    state: { from: location },
                  }}
                >
                  <img className={styles.image} src={img} alt={name} />
                  <div className={styles.descContainer}>
                    <p className={styles.name}>{name}</p>
                    {!botType ? (
                      <p className={styles.description}>
                        {historyM.length > 0
                          ? historyM[historyM.length - 1].message
                          : `you added contact: ${name}`}
                      </p>
                    ) : (
                      <div
                        className={styles.botLoaderMessage}
                        id="loaderContainer"
                      >
                        <p className={styles.descriptionLoader}>
                          {name} prints
                        </p>
                        <b className={styles.descLoaderPlus}>. . .</b>
                        <Loader
                          colorL="#fff"
                          typeLoader={'ThreeDots'}
                          scale={30}
                        />
                      </div>
                    )}
                  </div>
                  <p className={styles.date}>
                    {historyM.length > 0
                      ? moment(historyM[historyM.length - 1].date).format('ll')
                      : moment(date).format('ll')}
                  </p>
                </NavLink>
              </li>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>

      {widthW > 860 && (
        <Route path={`${path}`} component={Chat} filter={path} />
      )}
    </div>
  );
};

export default ContactsList;

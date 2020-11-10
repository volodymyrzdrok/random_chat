import React, { Suspense, lazy, useEffect } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';

import {
  fetchRandomAnswer,
  fetchRandomImages,
} from './services/randomAnswerApi';
import './App.css';
import HeaderUser from './components/HeaderUser/HeaderUser';
import Chat from './components/Chat/Chat';
import ContactsList from './components/ContactsList/ContactsList';
// import { useSelector, useDispatch } from 'react-redux';
// import routes from './services/routes';
// const Login = lazy(() => import('./Components/Login/Login'));
import routes from './services/routes';

import { useSelector, useDispatch } from 'react-redux';
function App() {
  const contacts = useSelector(state => state.contacts);

  return (
    <>
      <HeaderUser contacts={contacts} />

      {/* <ContactsList contacts={contacts} /> */}

      {/* <Header /> */}
      <Suspense fallback={null}>
        <Switch>
          <Route path={routes.contact} component={ContactsList} />

          <Redirect to={routes.contact} />
        </Switch>
      </Suspense>
    </>
  );
}

export default App;

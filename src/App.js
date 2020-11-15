import React, { Suspense, lazy, useEffect } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import routes from './services/routes';

const GoogleBtn = lazy(() => import('./components/Login/GoogleBtn'));
const HeaderUser = lazy(() => import('./components/HeaderUser/HeaderUser'));
const Chat = lazy(() => import('./components/Chat/Chat'));

const App = () => {
  const token = useSelector(state => state.session.token);
  const history = useHistory();

  useEffect(() => {
    token ? history.push(routes.contact) : history.push(routes.login);
  }, [token, history]);
  const widthW = document.documentElement.clientWidth;
  return (
    <>
      <Suspense fallback={null}>
        <Switch>
          <Route path={routes.login} component={GoogleBtn} />
          {widthW > 860 && (
            <Route path={routes.contact} component={HeaderUser} />
          )}
          {widthW < 860 && (
            <Route exact path={routes.contact} component={HeaderUser} />
          )}
          {widthW < 860 && <Route path={routes.contactId} component={Chat} />}
          <Redirect to={routes.contact} />
        </Switch>
      </Suspense>
    </>
  );
};

export default App;

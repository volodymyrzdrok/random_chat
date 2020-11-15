import React from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

const Alerting = () => {
  const alert = useSelector(state => getAlert(state));
  return (
    <CSSTransition
      timeout={250}
      in={alert}
      appear={true}
      unmountOnExit
      classNames="alert"
    >
      <div className="errorComp">no current text!</div>
    </CSSTransition>
  );
};

export default Alerting;

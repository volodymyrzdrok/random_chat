import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { setAccessToken, setImgUser, setNameUser } from '../../redux/slice';
import { useDispatch } from 'react-redux';
import styles from './Login.module.css';

const GoogleBtn = () => {
  const dispatch = useDispatch();

  const login = response => {
    if (response.accessToken) {
      dispatch(setAccessToken(response.accessToken));
      dispatch(setImgUser(response.profileObj.imageUrl));
      dispatch(setNameUser(response.profileObj.name));
    }
  };
  const handleLoginFailure = () => {
    alert('Failed to log in');
  };

  const CLIENT_ID =
    '1025667457262-dt6vresakr191gvfve3q1cdga5255ufr.apps.googleusercontent.com';
  return (
    <div className={styles.Login}>
      <h2 className={styles.loginTitle}>Welcome to chat app!</h2>
      <p className={styles.loginSubTitle}>
        Use your Google Account to sign in to app
      </p>
      <GoogleLogin
        className={styles.loginBtn}
        clientId={CLIENT_ID}
        buttonText="Login"
        onSuccess={login}
        onFailure={handleLoginFailure}
        cookiePolicy={'single_host_origin'}
        responseType="code,token"
      />
    </div>
  );
};

export default GoogleBtn;

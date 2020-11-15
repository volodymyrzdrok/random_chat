import React from 'react';
import Loader from 'react-loader-spinner';
import styles from './Loader.module.css';

const initialScale = 50;
const LoaderSpinner = ({ typeLoader, colorL, scale = initialScale }) => {
  return (
    <div className={styles.loaderSpinner}>
      <Loader type={typeLoader} color={colorL} height={scale} width={scale} />
    </div>
  );
};

export default LoaderSpinner;

import React from 'react';
import styles from './Button.module.css';

const Button = ({ type, text, click }) => {
  return (
    <div
      data-testID="button"
      className={styles.button + ' ' + styles[type]}
      onClick={() => {
        click();
      }}
    >
      <span>{text}</span>
    </div>
  );
};

export default Button;

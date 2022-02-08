import React from 'react';
import styles from './Button.module.css';

const Button = ({ type, text, click }) => {
  return (
    <Button
      className={`${styles}.${type}`}
      onClick={() => {
        click();
      }}
    >
      {text}
    </Button>
  );
};

export default Button;

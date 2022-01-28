import React from 'react';
import { PageHeader } from 'antd';
import styles from './Header.module.css';

const Header = ({ title, subTitle }) => {
  return (
    <>
      <PageHeader
        className={styles.header}
        onBack={() => null}
        title={title}
        subTitle={subTitle}
      />
    </>
  );
};

export default Header;

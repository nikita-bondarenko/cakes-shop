import React from 'react';
import PropTypes from 'prop-types';
import styles from './Logo.module.scss'

const Logo = () => {
    return (
        <div className={styles.logo}>
            <img className={styles.image} src="/images/logo.svg" alt="Логотип"/>
            <h1 className={styles.text}>Polina <br/> Romanova</h1>
        </div>
    );
};

export default Logo;
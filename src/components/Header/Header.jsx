import React from 'react';
import styles from './Header.module.scss';

const Header = (props) => {
    //console.log(props.title)
    return (
        <header className={styles.header}>
            <h1>{props.title}</h1>
        </header>
    );
};

export default Header;

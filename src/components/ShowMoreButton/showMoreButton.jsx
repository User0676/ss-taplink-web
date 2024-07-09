import React, { useEffect } from 'react';
import styles from './ShowMoreButton.module.scss';

const ShowMoreButton = ({ onClick, isShow }) => {
    return (
        <div className={styles.container}>
            {isShow && <button className={styles.button} onClick={onClick}>Показать ещё</button>}
        </div>
    );
};

export default ShowMoreButton;
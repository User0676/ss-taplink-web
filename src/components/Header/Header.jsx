import React from 'react';
import styles from './Header.module.scss';

const Header = (props) => {
    //console.log(props.title)
    return (
        <header className={styles.header}>

            <div className={styles.aboutShopH}>

            <div className={styles.headerImage}><img src={props.logo} className={styles.shopLogo}/></div>

            <div className={styles.shopInfo}><h1 className={styles.shopName}>{props.title}</h1>
            <h2 className={styles.shopNumber}>{props.phone}</h2>
                <div className={styles.shopRating}>
                <h2 className={styles.ratingNumber}>{props.rating}/5</h2>
                <p className={styles.ratingCnt}>({props.ratingCount} оценок)</p>
                    <></>
                    </div>
            </div>
            </div>
        </header>

    );
};

export default Header;

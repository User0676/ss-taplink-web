import React, { useState } from 'react';
import styles from './Header.module.scss';
import kaspiLogo from '../../assets/icons/kaspiIconGrey.jpeg';
import { Rating } from "@mui/material";
import { styled } from '@mui/material/styles';
import Loading from "../Loading/Loading";

const StyledRating = styled(Rating)({
    '& .MuiRating-icon': {
        fontSize: '1.1rem', // Здесь вы можете установить любой размер, например, '2rem', '24px' и т.д.
    },
    '& .MuiRating-iconFilled': {
        color: '#f24634',
    },
    '& .MuiRating-iconHover': {
        color: '#F9E076',
    },
});

const Header = (props) => {
    const [showAllReviews, setShowAllReviews] = useState(false);

    const makeMask = (phoneNumber) => {
        if (!phoneNumber?.startsWith("+7") || phoneNumber.length !== 12) {
            return phoneNumber
        }

        const countryCode = phoneNumber.slice(0, 2);
        const areaCode = phoneNumber.slice(2, 5);
        const centralOfficeCode = phoneNumber.slice(5, 8);
        const lineNumberPart1 = phoneNumber.slice(8, 10);
        const lineNumberPart2 = phoneNumber.slice(10, 12);

        return `${countryCode} (${areaCode}) ${centralOfficeCode}-${lineNumberPart1}-${lineNumberPart2}`;
    };


    const renderLogo = (logo) => {
        if(props.isFetching) {
            return <Loading/>
        }
        if (logo) {
            return (
                <div className={styles.headerImage}>
                    <img src={logo} alt="Shop Logo" className={styles.shopLogo} />
                </div>
            );
        }
        return (
            <div className={styles.headerImage}>
                <img src={kaspiLogo} alt="Kaspi Logo" className={styles.kaspiLogo} />
            </div>
        );
    };


    const renderRating = (rating, ratingCount, reviews) => {

            if(!ratingCount) {ratingCount=0;rating = 0}

            if(ratingCount > 0) {
                return (
                    <div className={styles.shopRating}>
                        <div className={styles.starAndRating}><StyledRating value={rating} readOnly/>
                            <h2 className={styles.ratingNumber}>{rating}</h2>
                        </div>
                        <p className={styles.ratingCnt}>({ratingCount} оценок)</p>
                        {reviews}
                    </div>

                );
            }else{
                return(
                    <div className={styles.onlyStarRating}><StyledRating value={rating} readOnly/></div>
                );
            }
    };

    return (
        <header className={styles.header}>
            <div className={styles.aboutShopH}>
                {renderLogo(props.logo)}
                <div className={styles.shopInfo}>
                    <h1 className={styles.shopName}>{props.title}</h1>
                    <h2 className={styles.shopNumber}>
                        <a href={`tel:${props.phone}`} className={styles.phoneLink}>
                            {makeMask(props.phone)}
                        </a>
                    </h2>
                   <div className={styles.ratingContainer}> {renderRating(props.rating, props.ratingCount)}</div>
                </div>
            </div>
        </header>
    );
};

export default Header;

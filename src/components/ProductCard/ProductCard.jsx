import React, { useContext, useEffect } from 'react';
import styles from './ProductCard.module.scss';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CartContext } from '../../contexts/CartContext';
import {Rating} from '@mui/material'
import { styled } from '@mui/material/styles';

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#F9E076',
    },
    '& .MuiRating-iconHover': {
        color: '#F9E076',
    },
});

const truncateText = (text, maxLines) => {
    const lines = text.split('\n').slice(0, maxLines);
    return lines.join('\n') + (lines.length === maxLines ? '...' : '');
};

const LimitedText = ({ text, maxLines }) => {
    const truncatedText = truncateText(text, maxLines);

    return (
        <div style={{ whiteSpace: 'pre-line' }}>
            {truncatedText}
        </div>
    );
};

const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const ProductCard = ({ product, merchant }) => {
    const { addToCart, openProductDetails } = useContext(CartContext);

    const handleAddToCart = (event) => {
        event.stopPropagation();
        addToCart(product);
    };

    const handleOpenProductDetails = () => {
        openProductDetails(product);
    };

    const renderStars = (rating) => {
        const maxRating = 5;
        const stars = [];
        for (let i = 0; i < maxRating; i++) {
            stars.push(
                <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>&#9733;</span>
            );
        }
        return stars;
    };

    const initButton = () => {
        ((d, s, id) => {
            let js, kjs;
            if (d.getElementById(id)) {
                //d.getElementById(id).remove()
                console.log("element:", d.getElementById(id))
                js = d.createElement(s); js.id = id;
                js.src = 'https://kaspi.kz/kaspibutton/widget/ks-wi_ext.js';
                // kjs = document.getElementsByTagName(s)[0]
                // kjs.parentNode.insertBefore(js, kjs);
                //console.log(kjs)
                return
            };
            js = d.createElement(s); js.id = id;
            js.src = 'https://kaspi.kz/kaspibutton/widget/ks-wi_ext.js';
            kjs = document.getElementsByTagName(s)[0]
            console.log("kjs", kjs)
            kjs.parentNode.insertBefore(js, kjs);
            console.log(kjs)
        })(document, 'script', 'KS-Widget')
    }

    useEffect(() => {
        //ksWidgetInitializer.reinit()
        //initButton()
    }, [merchant, product]);

    return (

        <div className={styles.productCard} onClick={handleOpenProductDetails}>

            <div className={styles.imageFormat}><img src={product.img} alt={product.name} className={styles.productImage} /></div>
            <div className={styles.productDetails}>
                <div className={styles.ratingPlace}>
                    <div className={styles.ratingBlock}><StyledRating name="read-only" value={product.reviews?.rating || 0}
                                                               readOnly/></div>
                    <div className={styles.ratingBlock}><p>{product.reviews?.reviewsAmount || "Нет "}</p></div>
                </div>
                {/* <div className="class-rating">{renderStars(product.rating)}</div>*/}
                <p className={styles.productName}> <LimitedText text={product.name} maxLines={2} /></p>
                <p className= {styles.descriptionBlock}>{product.category}</p>
                <div className={styles.price}>{formatNumber(product.price)} тг
                    {/* <div className={styles.rassrochkaContainer}>
                    <p className={styles.rassrochkaPrice}>{formatNumber(parseInt(product.price / 12))} т</p>
                    <p className={styles.rassrochkaMonth}>х12</p>
                    </div>*/}
                </div>
                
                <div className="ks-widget"
                    data-template="button"
                    data-merchant-sku={product.sku}
                    data-merchant-code={merchant}
                    data-city="750000000"
                    //style={{width: "200px", height: "auto"}}
                ></div>

                {/*<Button
                    variant="contained"
                    color="primary"
                    startIcon={<ShoppingCartIcon />}
                    onClick={handleAddToCart}
                >
                    В корзину
                </Button>;*/}
            </div>
        </div>
    );
};

export default ProductCard;

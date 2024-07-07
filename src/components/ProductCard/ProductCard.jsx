import React, { useContext } from 'react';
import styles from './ProductCard.module.scss';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CartContext } from '../../contexts/CartContext';
import {Rating} from '@mui/material'
import { styled } from '@mui/material/styles';

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#121',
    },
    '& .MuiRating-iconHover': {
        color: '#000',
    },
});

const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const ProductCard = ({ product }) => {
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
                <p>{product.name}</p>
                <p className= {styles.descriptionBlock}>{product.category}</p>
                <div className={styles.price}>{formatNumber(product.price)} тг
                    {/* <div className={styles.rassrochkaContainer}>
                    <p className={styles.rassrochkaPrice}>{formatNumber(parseInt(product.price / 12))} т</p>
                    <p className={styles.rassrochkaMonth}>х12</p>
                    </div>*/}
                </div>
                <div class="ks-widget"
                    data-template="button"
                    data-merchant-sku={product.sku}
                    data-merchant-code="1037016"
                    data-city="750000000"
                    data-style="desktop"
                ></div>

                <div className={styles.kaspiButton}><script>{function(d, s, id) {
                        let js, kjs;
                        if (d.getElementById(id)) return;
                        js = d.createElement(s); js.id = id;
                        js.src = 'https://kaspi.kz/kaspibutton/widget/ks-wi_ext.js';
                        kjs = document.getElementsByTagName(s)[0]
                        kjs.parentNode.insertBefore(js, kjs);
                    }(document, 'script', 'KS-Widget')}
                </script> </div>
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

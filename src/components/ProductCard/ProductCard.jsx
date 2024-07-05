import React, { useContext } from 'react';
import styles from './ProductCard.module.scss';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CartContext } from '../../contexts/CartContext';
import {Rating} from '@mui/material'
import { styled } from '@mui/material/styles';

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#000',
    },
    '& .MuiRating-iconHover': {
        color: '#000',
    },
});

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

            <img src={product.img} alt={product.name} className={styles.productImage} />
            <div className={styles.productDetails}>
                <div className={styles.ratingPlace}>
                    <div className={styles.ratingBlock}><StyledRating name="read-only" value={product.reviews?.rating || 0}
                                                               readOnly/></div>
                    <div className={styles.ratingBlock}><p>{product.reviews?.reviewsAmount || "Нет "}</p></div>
                </div>
                {/* <div className="class-rating">{renderStars(product.rating)}</div>*/}
                <p>{product.name}</p>
                <p >{product.description}</p>
                <p className= {styles.descriptionBlock}>{product.category}</p>
                <div className={styles.price}>{product.price} тг
                    <div className={styles.rassrochkaContainer}>
                    <p className={styles.rassrochkaPrice}>{parseInt(product.price / 12)} т</p>
                    <p className={styles.rassrochkaMonth}>х12</p>
                    </div>
                </div>
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

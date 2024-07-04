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
            <img src={product.image} alt={product.name} className={styles.productImage} />
            <div className={styles.productDetails}>
                <StyledRating name="read-only" value={product.rating} readOnly />
                <p>{product.reviewsCount} отзывов</p>
                {/* <div className="class-rating">{renderStars(product.rating)}</div>*/}
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <div className={styles.price}>{product.price} тг
                    <p>{parseInt(product.price/12)}х12</p>
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

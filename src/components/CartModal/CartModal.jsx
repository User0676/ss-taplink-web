import React, { useContext } from 'react';
import styles from './CartModal.module.scss';
import { CartContext } from '../../contexts/CartContext';
import Button from '@mui/material/Button';

const CartModal = () => {
    const { cartItems, isModalOpen, closeModal, openCartDetails } = useContext(CartContext);

    const handleProceedToCart = () => {
        openCartDetails();
    };

    return (
        <div className={`${styles.cartModal} ${isModalOpen ? styles.show : ''}`}>
            <div className={styles.modalContent}>
                <h2>Товаров: {cartItems.length}</h2>
                <Button variant="contained" color="primary" onClick={handleProceedToCart}>
                    Перейти в корзину
                </Button>
            </div>
        </div>
    );
};

export default CartModal;

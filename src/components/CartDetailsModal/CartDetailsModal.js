import React, { useContext } from 'react';
import styles from './CartDetailsModal.module.scss';
import { CartContext } from '../../contexts/CartContext';
import Button from '@mui/material/Button';

const CartDetailsModal = () => {
    const { cartItems, isCartDetailsOpen, closeCartDetails } = useContext(CartContext);

    return (
        <div className={`${styles.cartDetailsModal} ${isCartDetailsOpen ? styles.show : ''}`}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={closeCartDetails}>✕</button>
                <h2>Корзина</h2>
                {cartItems.length === 0 ? (
                    <p>Ваша корзина пуста</p>
                ) : (
                    <ul>
                        {cartItems.map((item, index) => (
                            <li key={index}>
                                <img src={item.image} alt={item.name} className={styles.productImage} />
                                <div>
                                    <h3>{item.name}</h3>
                                    <p>{item.description}</p>
                                    <div className={styles.price}>{item.price} т</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                <Button variant="contained" color="secondary" onClick={closeCartDetails}>
                    Закрыть
                </Button>
            </div>
        </div>
    );
};

export default CartDetailsModal;

import React, { useContext, useEffect, useState } from 'react';
import styles from './ProductDetailsModal.module.scss';
import { CartContext } from '../../contexts/CartContext';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StarIcon from '@mui/icons-material/Star';
import axios from "axios";
import { config } from "../../config";
import Loading from '../Loading/Loading';


const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const ProductDetailsModal = () => {
    const { selectedProduct, closeProductDetails, addToCart } = useContext(CartContext);
    const [productData, setProductData] = useState(null);

    const getProductData = async () => {
        setProductData(null)
        if (!selectedProduct) {
            return;
        }
        try {
            const response = await axios.get(`${config.apiUrl}/products/${selectedProduct.sku}`);
            if (response.status === 200) {
                setProductData(response.data);
            }
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching product data:", error);
        }
    };

    useEffect(() => {
        getProductData();
    }, [selectedProduct]);

    if (!selectedProduct) {
        return null;
    }

    const handleAddToCart = () => {
        addToCart(selectedProduct);
        closeProductDetails();
    };

    const renderCharacteristics = (characteristics) => {
        if (!characteristics) {
            return null;
        }

        return (
            <>
                {/*<ul>
                {Object.entries(characteristics).map(([key, value]) => (
                    <li>{typeof value === 'object' ? renderCharacteristics(value) : value}</li>
                ))}
                </ul>*/}
                <div>
                    {characteristics.map((characteristic) => (
                        <div>
                            <strong>{characteristic.name}</strong>
                            {characteristic.features.map((value) => (
                                <div>
                                    <p><bold>{value.name}:</bold> {value.value}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </>
        );
    };

    return (
        <div className={`${styles.productDetailsModal} ${selectedProduct ? styles.show : ''}`}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={closeProductDetails}>✕</button>


                <img src={selectedProduct.img} alt={selectedProduct.name} className={styles.productImage}/>

                <div className={styles.reviewComponent}>
                    <StarIcon className={styles.reviewIcon}/>
                    <p>{productData.AverageRating?.toFixed(2)} </p>
                    <span className={styles.reviewNumComponent}>({productData.reviewsAmount} отзывов)</span>
                </div>

                <h2 className={styles.productName}>{selectedProduct.name}</h2>
                <p className={styles.descriptionBlock}>{selectedProduct.category}</p>


                <p>{selectedProduct.description}</p>
                <div className={styles.price}>{formatNumber(selectedProduct.price)} т


                <div className={styles.rassrochkaContainer}>
                    <p className={styles.rassrochkaPrice}>{formatNumber(parseInt(selectedProduct.price / 12))} т</p>
                    <p className={styles.rassrochkaMonth}>х12</p>
                </div>
                </div>

                {!productData && <><Loading/></>}

                {productData &&
                    <div className={styles.productDetails}>
                        <h2 className={styles.descriptionName}>Характеристики</h2>
                        {renderCharacteristics(productData.characteristics)}


                    <div className={styles.reviewComponents}>
                        <div className={styles.reviewComponent2}>
                            <p>Оценка и Отзывы</p>
                            <StarIcon className={styles.reviewIcon}/>
                            <p>{productData.AverageRating?.toFixed(2)} </p>
                            <span className={styles.reviewNumComponent}>({productData.reviewsAmount} отзывов)</span>
                        </div>

                        <div className={styles.userReviews}>
                            {productData?.reviews && productData.reviews.length > 0 ? (
                                productData.reviews.map((review) => (
                                    <div key={review.id} className={styles.review}>

                                        <div className={styles.mainRevInfo}>
                                        <p className={styles.reviewAuthor}><strong>{review.author}</strong></p> <StarIcon
                                        className={styles.reviewIcon}/>
                                        <p className={styles.reviewDate}>{(new Date(review.date)).toLocaleDateString("en-US", {})}</p>
                                        </div>
                                        <p>{review.commentText}</p>

                                    </div>
                                ))
                            ) : (
                                <p>Нету отзывов.</p>
                            )}
                        </div>


                    </div>
                </div>}

                {/*  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ShoppingCartIcon />}
                    onClick={handleAddToCart}
                >
                    Добавить в корзину
                </Button>*/}
            </div>
        </div>
    );
};

export default ProductDetailsModal;

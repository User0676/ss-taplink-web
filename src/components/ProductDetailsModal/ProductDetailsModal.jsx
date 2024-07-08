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
    const [showAllCharacteristics, setShowAllCharacteristics] = useState(false);
    const [showAllReviews, setShowAllReviews] = useState(false);

    const getProductData = async () => {
        setProductData(null);
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

    const handleCloseProductDetails = () => {
        setShowAllCharacteristics(false);
        setShowAllReviews(false);
        closeProductDetails();
    };

    const handleAddToCart = () => {
        addToCart(selectedProduct);
        handleCloseProductDetails();
    };

    const renderCharacteristics = (characteristics) => {
        if (!characteristics) {
            return null;
        }

        const visibleCharacteristics = showAllCharacteristics ? characteristics : characteristics.slice(0, 1);

        return (
            <>
                <div>
                    {visibleCharacteristics.map((characteristic, index) => (
                        <div key={index}>
                            <strong>{characteristic.name}</strong>
                            {characteristic.features.map((value, index) => (
                                <div key={index}>
                                    <p><strong>{value.name}:</strong> {value.value}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                {!showAllCharacteristics && characteristics.length > 1 && (
                    <p className={styles.showMoreLink} onClick={() => setShowAllCharacteristics(true)}>
                        Смотреть полностью
                    </p>
                )}
            </>
        );
    };

    const renderReviews = (reviews) => {
        if (!reviews) {
            return null;
        }

        const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 3);

        return (
            <>
                <div className={styles.userReviews}>
                    {visibleReviews.length > 0 ? (
                        visibleReviews.map((review) => (
                            <div key={review.id} className={styles.review}>
                                <div className={styles.mainRevInfo}>
                                    <p className={styles.reviewAuthor}><strong>{review.author}</strong></p>
                                    <StarIcon className={styles.reviewIcon} />
                                    <p className={styles.reviewDate}>{(new Date(review.date)).toLocaleDateString("en-US", {})}</p>
                                </div>
                                <p>{review.commentText}</p>
                            </div>
                        ))
                    ) : (
                        <p>Нету отзывов.</p>
                    )}
                </div>
                {!showAllReviews && reviews.length > 3 && (
                    <p className={styles.showMoreLink} onClick={() => setShowAllReviews(true)}>
                        Показать все отзывы
                    </p>
                )}
            </>
        );
    };

    if (!selectedProduct) {
        return null;
    }

    return (
        <div className={`${styles.productDetailsModal} ${selectedProduct ? styles.show : ''}`}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={handleCloseProductDetails}>✕</button>

                {selectedProduct.img && (
                    <img src={selectedProduct.img} alt={selectedProduct.name} className={styles.productImage} />
                )}

                <div className={styles.reviewComponent}>
                    <StarIcon className={styles.reviewIcon} />
                    <p>{productData?.AverageRating?.toFixed(2)}</p>
                    <span className={styles.reviewNumComponent}>({productData?.reviewsAmount} отзывов)</span>
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

                {!productData && <><Loading /></>}

                {productData &&
                    <div className={styles.productDetails}>
                        <h2 className={styles.descriptionName}>Характеристики</h2>
                       <div className={styles.characteristicsByOne}> {renderCharacteristics(productData.characteristics)}</div>

                        <div className={styles.reviewComponents}>
                            <div className={styles.reviewComponent2}>
                                <p>Оценка и Отзывы</p>
                                <StarIcon className={styles.reviewIcon} />
                                <p>{productData?.AverageRating?.toFixed(2)}</p>
                                <span className={styles.reviewNumComponent}>({productData.reviewsAmount} отзывов)</span>
                            </div>
                            <div className={styles.reviewsByOne}>{renderReviews(productData.reviews)}</div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default ProductDetailsModal;
;

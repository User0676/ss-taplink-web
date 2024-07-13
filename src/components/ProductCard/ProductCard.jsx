import React, { useContext, useEffect, useState, useRef } from 'react';
import styles from './ProductCard.module.scss';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CartContext } from '../../contexts/CartContext';
import {Rating} from '@mui/material'
import { styled } from '@mui/material/styles';
import axios from 'axios';
import Loading from '../Loading/Loading';

export function useInterval(callback, delay) { 
    // Creating a ref  
    const savedCallback = useRef(); 
  
    // To remember the latest callback . 
    useEffect(() => { 
        savedCallback.current = callback; 
    }, [callback]); 
  
    // combining the setInterval and  
    //clearInterval methods based on delay. 
    useEffect(() => { 
        function func() { 
            savedCallback.current(); 
        } 
        if (delay !== null) { 
            let id = setInterval(func, delay); 
            return () => clearInterval(id); 
        } 
    }, [delay]); 
}

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#f24634',
    },
    '& .MuiRating-iconHover': {
        color: '#f24634',
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

const ProductCard = ({ product, merchant, cityId, setProductsLoading }) => {
    const { addToCart, openProductDetails } = useContext(CartContext);
    const [isFetching, setIsFetching] = useState(true)
    const [isError, setIsError] = useState(false)
    const [tries, setTries] = useState(0)

    useInterval(() => {
        setTries(tries + 1)
        if (tries >= 1) {
            setIsFetching(false)
            setIsError(true)
            return
        }
        const children = document.querySelector(`div [data-merchant-sku="${product.sku}"]`)?.children
        if (children?.length) {
            console.log(`product ${product.name} children`)
            console.log(children)
            console.log(product.sku)
            setIsFetching(false)
            document.querySelector(`div [data-merchant-sku="${product.sku}"]`).className = ""
            setProductsLoading(false)
            //console.log("SetProductsLoading set to false")
        }
        //console.log("SetProductsLoading set to false")
        //console.log(children)
        //setIsFetching(true)
    }, tries <= 1 && isFetching ? 1000 : null)

    // useEffect(async () => {
    //     await getProductExist()
    // }, [product])

    // const getProductExist = async () => {
    //     const referer = `https://kaspi.kz/shop/kaspibutton/frame/?template=button&merchantSku=${product.sku}&merchantCode=${merchant}&city=${cityId}&id=ks-lyecdbu5&url=${window.location.href}&pt=React%20App`
    //     //const url = "https://kaspi.kz/shop/kaspibutton/frame/?template=button&merchantSku=%D0%A0%D0%9F2035&merchantCode=6866009&city=750000000&id=ks-lyecsbsv&url=http%3A%2F%2Flocalhost%3A3000%2Ftupperware-best%2F&pt=React%20App"
    //     const url = "https://kaspi.kz/kaspibutton/static/blocks/button/button_ext.js"
    //     const response = await axios.get(url, {headers: {
    //         "Referer": referer
    //     },}).catch((err) => {
    //         console.log(err)
    //     })
    //     console.log(response)
    // }



    const handleAddToCart = (event) => {
        event.stopPropagation();
        addToCart(product);
    };

    const handleOpenProductDetails = () => {
        openProductDetails(product);
    };



    return (

        <>
            {isFetching && <Loading size="default"/>}
            <div className={styles.productCard} onClick={handleOpenProductDetails} style={{display: isFetching || isError ? "none" : "block"}}>
                <div className={styles.productsContainer}>
                <div className={styles.imageFormat}><img src={product.img} alt={product.name} className={styles.productImage} /></div>
                    <div className={styles.productDetails}>

                        {/* <div className="class-rating">{renderStars(product.rating)}</div>*/}
                        <p className={styles.productName}><LimitedText text={product.name} maxLines={2}/></p>
                        <p className={styles.descriptionBlock}>{product.category}</p>

                        <div className={styles.ratingPlace}>
                            <div className={styles.ratingBlock}><StyledRating name="read-only"
                                                                              value={product.reviews?.rating || 0}
                                                                              readOnly/></div>

                                {product.reviews?.reviewsAmount > 0 ? (
                                    <p className={styles.reviewAmount}>{product.reviews.reviewsAmount} (отзывов)</p>
                                ) : (
                                    ''
                                )}
                        </div>

                        <div className={styles.price}>
                            <div className={styles.PriceFull}>{formatNumber(product.price)} ₸</div>
                            {/* <div className={styles.rassrochkaContainer}>
                        <p className={styles.rassrochkaPrice}>{formatNumber(parseInt(product.price / 12))} т</p>
                        <p className={styles.rassrochkaMonth}>х12</p>
                        </div>*/}


                            <div className="ks-widget"
                                //data-template="button"
                                 data-template="flatButton"
                                 data-merchant-sku={product.sku}
                                 data-merchant-code={merchant}
                                 data-city="750000000"
                                 data-style="small"

                                //style={{width: "200px", height: "auto"}}
                            ></div>
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
        </>
    );
};

export default ProductCard;

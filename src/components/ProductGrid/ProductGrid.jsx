import React, { useEffect, useState } from 'react';
import styles from './ProductGrid.module.scss';
import ProductCard from '../ProductCard/ProductCard';
import Loading from '../Loading/Loading';

// Функция сортировки продуктов
const sortProducts = (products, sortType) => {
    switch (sortType) {
        case 'popular':
            // Логика сортировки по популярности
            return products;
        case 'new':
            // Логика сортировки по новизне
            return products;
        case 'cheap':
            // Логика сортировки по возрастанию цены
            return products.sort((a, b) => a.price - b.price);
        case 'expensive':
            // Логика сортировки по убыванию цены
            return products.sort((a, b) => b.price - a.price);
        default:
            return products;
    }
};

const ProductGrid = ({ viewType, sortType, products, isLoading, merchant, cityId, productsToShowCount, setProductsLoading }) => {
    const [productsCount, setProductsCount] = useState(productsToShowCount);
    const initButton = () => {
        ((d, s, id) => {
            let js, kjs;
            if (d.getElementById(id)) {
                //console.log("element:", d.getElementById(id))
                //js = d.createElement(s); js.id = id;
                js = d.getElementById(id);
                console.log("js: ", js)
                js.remove()
                //js.removeAttribute("id")
                //js.removeAttribute("src")
                //js.id = id;
                //js.src = 
                for (const el of d.getElementsByClassName("ks-widget")) {
                    for (const child of el.children) {
                        child.remove() 
                    }
                }
                js = d.createElement(s); js.id = id;
                js.src = 'https://kaspi.kz/kaspibutton/widget/ks-wi_ext.js';
                //js.id = id;
                //js = d.getElementById(id);
                kjs = document.getElementsByTagName(s)[0]
                console.log(kjs)
                console.log(js)
                kjs.parentNode.insertBefore(js, kjs);
                console.log(kjs)
                
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
        initButton()
    }, [products, productsToShowCount])

    useEffect(() => {
        //console.log(productsToShowCount, "/", products?.length)
        setProductsCount(productsToShowCount)
        console.log(productsCount, "/", products?.length)
    }, [productsToShowCount])
 

    if (!products || isLoading) {
        return ( 
            <>
                <Loading/>
            </>
        );
    }
    console.log(products)

    return (
        <div className={viewType === 'grid' ? styles.productGrid : styles.productList}>
            {products.slice(0, productsCount).map((product) => (
                <ProductCard key={product.id} product={product} merchant={merchant} cityId={cityId} setProductsLoading={setProductsLoading}/>
            ))}
        </div>
    );
};

export default ProductGrid;
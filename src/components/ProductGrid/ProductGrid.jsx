import React from 'react';
import styles from './ProductGrid.module.scss';
import ProductCard from '../ProductCard/ProductCard';
import Loading from '../Loading/Loading';
// const products = [
//     {
//         id: 1,
//         name: 'Котики',
//         description: 'Животные',
//         price: 999999,
//         image: require('../../assets/images/cat.jpg'),
//         rating: 5,
//         reviewsCount: 14

//     },
//     {
//         id: 2,
//         name: 'Котики',
//         description: 'Животные',
//         price: 232,
//         image: require('../../assets/images/cat.jpg'),
//         rating: parseFloat('5'),
//         reviewsCount: 14
//     },
//     {
//         id: 3,
//         name: 'Котики',
//         description: 'Животные',
//         price: parseFloat('999994'),
//         image: require('../../assets/images/cat.jpg'),
//         rating: parseFloat('3.4'),
//         reviewsCount: 14
//     },
//     {
//         id: 4,
//         name: 'Котики',
//         description: 'Животные',
//         price: parseFloat('799994'),
//         image: require('../../assets/images/cat.jpg'),
//         rating: 4.9,
//         reviewsCount: 14
//     },
//     {
//         id: 5,
//         name: 'Котики',
//         description: 'Животные',
//         price: parseFloat('199994'),
//         image: require('../../assets/images/cat.jpg'),
//         rating: 1.7,
//         reviewsCount: 14
//     },
//     {
//         id: 6,
//         name: 'Котики',
//         description: 'Животные',
//         price: parseFloat('299994'),
//         image: require('../../assets/images/cat.jpg'),
//         rating: 1,
//         reviewsCount: 14
//     },
//     {
//         id: 7,
//         name: 'Котики',
//         description: 'Животные',
//         price: parseFloat('999394'),
//         image: require('../../assets/images/cat.jpg'),
//         rating: 2.3,
//         reviewsCount: 14
//     },    {
//         id: 8,
//         name: 'Котики',
//         description: 'Животные',
//         price: parseFloat('929994'),
//         image: require('../../assets/images/cat.jpg'),
//         rating: 3.5,
//         reviewsCount: 14
//     },


// ];

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

const ProductGrid = ({ viewType, sortType, products, isLoading }) => {
    if (!products || isLoading) {
        return (
            <>
                <Loading/>
            </>
        );
    }
    console.log(products)
    const sortedProducts = sortProducts(products, sortType);

    return (
        <div className={viewType === 'grid' ? styles.productGrid : styles.productList}>
            {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductGrid;
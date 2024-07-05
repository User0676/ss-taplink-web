import React, { useEffect, useState } from 'react';
import styles from '../../App.module.scss';
import Header from '../../components/Header/Header';
import SearchBar from '../../components/SearchBar/SearchBar';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import FilterSortControls from '../../components/FilterAndView/controls';
import { CartProvider } from '../../contexts/CartContext';
import CartModal from '../../components/CartModal/CartModal';
import CartDetailsModal from '../../components/CartDetailsModal/CartDetailsModal';
import ProductDetailsModal from '../../components/ProductDetailsModal/ProductDetailsModal';
import ProductFilterModal from '../../components/ProductFilterModal/ProductFilterModal';
import SortModal from '../../components/SortModal/SortModal';
import { config } from '../../config';
import axios from 'axios';
import { useParams } from 'react-router-dom';


export const Home = () => {
    const [sortType, setSortType] = useState('');
    const [viewType, setViewType] = useState('grid');
    const [id, setId] = useState(useParams().storeId)
    const [isLoading, setIsLoading] = useState(true);
    const [filterIsLoading, setfilterIsLoading] = useState(false)

    const [title, setTitle] = useState('');

    const [products, setProducts] = useState([]);

    const [body, setBody] = useState({
        "page": 1,
        "limit": 10,
        "sortBy": "new",
        "sortDirection": "desc",
        "query": "",
        "category": "",
        "brand": "",
        "filters": [
        ]
    });

    //console.log(id)

    useEffect(() => {
        fetchStoreData(id)
    })

    useEffect(() => {
        fetchProducts()
    }, [body])

    const onFilterApply = (filter) => {
        setBody({
            ...body,
            brand: filter.brand,
            category: filter.category,
            filters: Object.entries(filter.characteristics).map(([name, values]) => ({name, values}))
        })
    };

    const fetchProducts = () => {
        console.log(body)
        setIsLoading(true)
        axios.post(`${config.apiUrl}/products/${id}`, body).then((response) => {
            setProducts(response.data)
            console.log(response.data)
            setIsLoading(false)
        }).catch((error) => {
            console.log(error)
            setIsLoading(false)
        })
    }

    const fetchFilters = (filter) => {
        console.log({...body, ...filter})
        setfilterIsLoading(true)
        axios.post(`${config.apiUrl}/filter-preview/${id}`, {...body, ...filter}).then((response) => {
            console.log(response.data)
            setProducts({...products, filter: response.data})
            console.log(products)
        }).catch((error) => {
            console.log(error)
        }).finally(() => setfilterIsLoading(false))
    }

    const fetchStoreData = (id) => {
        axios.get(`${config.apiUrl}/store/${id}`).then((response) => {
            //console.log(response.data)
            setTitle(response.data[0].name)
            //console.log(response.data[0].name)
        }).catch((error) => {
            console.log(error)
        })
    }

    const handleSortChange = (sortType) => {
        console.log(`Filtering by ${sortType} sort...`);
        setBody({...body, sortBy: sortType})
    };

    const handleViewChange = (viewType) => {
        setViewType(viewType);
    };

    return (
        <>
            <CartProvider>
            <div className={styles.app}>
                <Header title={title}/>
                <div className={styles.container}>
                    <SearchBar />
                    <FilterSortControls onSortChange={handleSortChange} onViewChange={handleViewChange} />
                    <ProductGrid viewType={viewType} sortType={sortType} products={products.products} isLoading={isLoading}/>
                </div>
                <CartModal />
                <CartDetailsModal />
                <ProductDetailsModal />
                <ProductFilterModal 
                    onFilterApply={onFilterApply}
                    categories={products.filter?.categories}
                    brands={products.filter?.brands}
                    minPrice={products.filter?.minPrice}
                    maxPrice={products.filter?.maxPrice}
                    characteristics={products.filter?.availableFilters}
                    onChange={fetchFilters}
                    isLoading={filterIsLoading}
                />
                <SortModal onSortChange={handleSortChange} />
            </div>
        
            </CartProvider>
        </>
    )
}

export default Home
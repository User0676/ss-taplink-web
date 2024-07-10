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
import { useParams, useSearchParams } from 'react-router-dom';
import ShowMoreButton from '../../components/ShowMoreButton/showMoreButton';


export const Home = () => {
    const [sortType, setSortType] = useState('');
    const [viewType, setViewType] = useState('grid');
    const [id, setId] = useState("")
    const [slug, setSlug] = useState(useParams().storeSlug)
    const [isLoading, setIsLoading] = useState(true);
    const [filterIsLoading, setfilterIsLoading] = useState(false)
    const [merchantCode, setMerchantCode] = useState("")
    const [merchantLogo, setMerchantLogo] = useState("")
    const [merchantPhone, setMerchantPhone] = useState("")
    const [rating, setRating] = useState(null)
    const [ratingCount, setRatingCount] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams();
    const [productsToShowCount, setProductsToShowCount] = useState(10)

    //const [storeId, setStoreId] = useState("")

    const [title, setTitle] = useState('');



    const [products, setProducts] = useState([]);

    const [body, setBody] = useState({
        "page": 1,
        "limit": 1000,
        "sortBy": "price",
        "sortDirection": "asc",
        "query": "",
        "category": "",
        "brand": "",
        "filters": [
        ],
        "productsList": searchParams.get("products-list")?.split(" ") || []
    });

    console.log(id)

    useEffect(() => {
        fetchStoreData(id)
    }, [slug])

    useEffect(() => {
        fetchProducts()
    }, [body, id])

    const onFilterApply = (filter) => {
        setBody({
            ...body,
            brand: filter.brand,
            category: filter.category,
            filters: Object.entries(filter.characteristics).map(([name, values]) => ({name, values}))
        })
        setProductsToShowCount(10)
    };

    const fetchProducts = () => {
        console.log(id)
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

    // const fetchFilters = (filter) => {
    //     console.log({...body, ...filter})
    //     setfilterIsLoading(true)
    //     axios.post(`${config.apiUrl}/filter-preview/${id}`, {...body, ...filter}).then((response) => {
    //         console.log(response.data)
    //         setProducts({...products, filter: response.data})
    //         console.log(products)
    //     }).catch((error) => {
    //         console.log(error)
    //     }).finally(() => setfilterIsLoading(false))
    // }

    const fetchStoreData = (id) => {
        axios.get(`${config.apiUrl}/store/${slug}`).then((response) => {
            //console.log(response.data)
            setTitle(response.data.name)
            setMerchantCode(response.data.storeId)
            setId(response.data._id)
            setMerchantLogo(response.data.logo)
            setMerchantPhone(response.data.phone)
            setRatingCount(response.data.ratingCount)
            setRating(response.data.rating)
            console.log(response.data)
            console.log(id)
        }).catch((error) => {
            console.log(error)
        })
    }

    const handleSortChange = (sortType) => {
        console.log(`Sorting by ${sortType}...`);
        switch (sortType) {
            case "Популярные":
                setBody({...body, sortBy: "popularity", sortDirection: "desc"})
                break;
            case "Новинки":
                setBody({...body, sortBy: "new", sortDirection: "desc"})
                break;
            case "Сначала дешевые":
                setBody({...body, sortBy: "price", sortDirection: "asc"})
                break;
            case "Сначала дорогие":
                setBody({...body, sortBy: "price", sortDirection: "desc"})
                break;
            case "Высокий рейтинг":
                setBody({...body, sortBy: "rating", sortDirection: "desc"})
                break;
            default:
                setBody({...body, sortBy: "new", sortDirection: "desc"})
        }
        setProductsToShowCount(10)
        //setBody({...body, sortBy: sortType})
    };

    const handleViewChange = (viewType) => {
        setViewType(viewType);
    };

    const handleSearchSubmit = (query) => {
        setBody({...body, query: query});
        setProductsToShowCount(10)

    };

    const showMore = () => {
        setProductsToShowCount(productsToShowCount + 10)
    }

    return (
        <>
            <CartProvider>
            <div className={styles.app}>

                <div className={styles.headerContainer}>
                    <div className={styles.shopInfo}>
                    <Header title={title} logo={merchantLogo} phone={merchantPhone} rating={rating} ratingCount={ratingCount} />
                        <></>
                    </div>
                    <div className={styles.searchAndFilter}>
                    <SearchBar onSubmit={handleSearchSubmit} />
                    <FilterSortControls onSortChange={handleSortChange} onViewChange={handleViewChange} />
                    </div>
                </div>
                <ProductGrid viewType={viewType} sortType={sortType} products={products.products} productsToShowCount={productsToShowCount} isLoading={isLoading} merchant={merchantCode} cityId={"750000000"}/>
                <ShowMoreButton onClick={showMore} isShow={!isLoading && productsToShowCount < products.products?.length} />
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
                    //onChange={fetchFilters}
                    isLoading={filterIsLoading}
                />
                <SortModal onSortChange={handleSortChange} />
            </div>

            </CartProvider>
        </>
    )
}

export default Home
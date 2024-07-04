import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styles from './App.module.scss';
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import ProductGrid from './components/ProductGrid/ProductGrid';
import FilterSortControls from './components/FilterAndView/controls';
import { CartProvider } from './contexts/CartContext';
import CartModal from './components/CartModal/CartModal';
import CartDetailsModal from './components/CartDetailsModal/CartDetailsModal';
import ProductDetailsModal from './components/ProductDetailsModal/ProductDetailsModal';
import ProductFilterModal from './components/ProductFilterModal/ProductFilterModal';
import SortModal from './components/SortModal/SortModal';

const App = () => {
    const [sortType, setSortType] = useState('');
    const [viewType, setViewType] = useState('grid');

    const handleSortChange = (sortType) => {
        setSortType(sortType);
    };

    const handleViewChange = (viewType) => {
        setViewType(viewType);
    };

    return (
        <CartProvider>
            <Router>
                <div className={styles.app}>
                    <Header />
                    <div className={styles.container}>
                        <SearchBar />
                        <FilterSortControls onSortChange={handleSortChange} onViewChange={handleViewChange} />
                        <Routes>
                            <Route path="/" element={<ProductGrid viewType={viewType} sortType={sortType} />} />
                        </Routes>
                    </div>
                    <CartModal />
                    <CartDetailsModal />
                    <ProductDetailsModal />
                    <ProductFilterModal />
                    <SortModal />
                </div>
            </Router>
        </CartProvider>
    );
};

export default App;

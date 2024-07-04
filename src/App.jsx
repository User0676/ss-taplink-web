import React, { useEffect, useState } from 'react';
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
import { Home } from './pages/main';
import axios from 'axios';
import {config} from './config';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/:storeId" element={
                    <Home />
                } />
            </Routes>
            
            
        </Router>
    );
};

export default App;

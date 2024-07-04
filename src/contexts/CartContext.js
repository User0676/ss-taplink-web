import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCartDetailsOpen, setIsCartDetailsOpen] = useState(false);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [isSortModalOpen, setIsSortModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [sortType, setSortType] = useState('Популярные'); // Add initial sort type


    const addToCart = (product) => {
        setCartItems((prevItems) => [...prevItems, product]);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openCartDetails = () => {
        setIsModalOpen(false);
        setIsCartDetailsOpen(true);
    };

    const closeCartDetails = () => {
        setIsCartDetailsOpen(false);
    };

    const openProductDetails = (product) => {
        setSelectedProduct(product);
    };

    const closeProductDetails = () => {
        setSelectedProduct(null);
    };

    const openFilterModal = () => {
        setIsFilterModalOpen(true);
    };

    const closeFilterModal = () => {
        setIsFilterModalOpen(false);
    };

    const openSortModal = () => {
        setIsSortModalOpen(true);
    };

    const closeSortModal = () => {
        setIsSortModalOpen(false);
    };

    const handleSortChange = (sortType) => {
        setSortType(sortType);
        closeSortModal();
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            isModalOpen,
            closeModal,
            isCartDetailsOpen,
            openCartDetails,
            closeCartDetails,
            openProductDetails,
            closeProductDetails,
            selectedProduct,
            isFilterModalOpen,
            openFilterModal,
            closeFilterModal,
            isSortModalOpen,
            openSortModal,
            closeSortModal,
            sortType,
            handleSortChange,
        }}>
            {children}
        </CartContext.Provider>
    );
};


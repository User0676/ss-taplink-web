import React, { useContext, useEffect, useState } from 'react';
import styles from './ProductFilterModal.module.scss';
import { CartContext } from '../../contexts/CartContext';
import Button from '@mui/material/Button';
import Loading from '../Loading/Loading';
import BoxedCheckbox from '../Checkbox/checkbox';
import RangeSlider2 from '../RangeSlider/RangeSlider';

const ProductFilterModal = ({ onFilterApply, categories, brands, minPrice, maxPrice, characteristics, isLoading }) => {
    const { isFilterModalOpen, closeFilterModal } = useContext(CartContext);
    const [filter, setFilter] = useState({
        category: '',
        brand: '',
        minPrice: minPrice,
        maxPrice: maxPrice,
        characteristics: {},
    });

    useEffect(() => {
        setFilter((prevFilter) => ({ ...prevFilter, minPrice, maxPrice }));
    }, [minPrice, maxPrice]);

    // useEffect(() => {
    //     onChange(filter);
    // }, [filter]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        console.log("FilterChange", e)
        setFilter((prevFilter) => ({
            ...prevFilter,
            [name]: value,
        }));
    };

    const handlePriceChange = ([min, max]) => {
        console.log("Price change")
        setFilter((prevFilter) => ({
            ...prevFilter,
            minPrice: min,
            maxPrice: max,
        }));
    };

    const handleCharacteristicChange = (name, value) => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            characteristics: {
                ...prevFilter.characteristics,
                [name]: value,
            },
        }));
    };

    const handleApplyFilter = () => {
        onFilterApply(filter);
        closeFilterModal();
    };

    if (!categories || !brands) {
        return <Loading />;
    }

    return (
        <div className={`${styles.productFilterModal} ${isFilterModalOpen ? styles.show : ''}`}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={closeFilterModal}>✕</button>
                <h2 className={styles.FilterTag}>Фильтр</h2>

                <div className={styles.filterSection}>
                    <h3>Категории</h3>
                    <div className={styles.selectContainer}>
                        <select name="category" onChange={handleFilterChange} className={styles.selectButtons}>
                            <option value="" className={styles.CategoryName}>Все</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/*<div className={styles.filterSection}>*/}
                {/*    <h3>Бренды</h3>*/}
                {/*    <select name="brand" onChange={handleFilterChange} className={styles.selectButtons}>*/}
                {/*        <option value="">Все</option>*/}
                {/*        {brands.map((brand) => (*/}
                {/*            <option key={brand} value={brand}>{brand}</option>*/}
                {/*        ))}*/}
                {/*    </select>*/}
                {/*</div>*/}

                {/*<div className={styles.filterSection}>*/}
                {/*    <h3>Цена</h3>*/}
                {/*    <div className={styles.sliderOnModal}>*/}
                {/*        <RangeSlider2 minPrice={filter.minPrice} maxPrice={filter.maxPrice} onChange={handlePriceChange} />*/}
                {/*    </div>*/}
                {/*    <div>*/}
                {/*        <span>от {filter.minPrice?.toLocaleString()} ₸</span>*/}
                {/*        <span>до {filter.maxPrice?.toLocaleString()} ₸</span>*/}
                {/*    </div>*/}
                {/*</div>*/}

                {/*{isLoading && <Loading />}*/}

                {/*{!isLoading && characteristics.map((characteristic) => (*/}
                {/*    <div key={characteristic.name} className={styles.filterSection}>*/}
                {/*        <h3>{characteristic.name}</h3>*/}
                {/*        {characteristic.values.map((value) => (*/}
                {/*            <BoxedCheckbox*/}
                {/*                key={value}*/}
                {/*                value={value}*/}
                {/*                onClick={(isChecked) => handleCharacteristicChange(*/}
                {/*                    characteristic.name,*/}
                {/*                    isChecked*/}
                {/*                        ? [...(filter.characteristics[characteristic.name] || []), value]*/}
                {/*                        : (filter.characteristics[characteristic.name] || []).filter((v) => v !== value)*/}
                {/*                )}*/}
                {/*            />*/}
                {/*        ))}*/}
                {/*    </div>*/}
                {/*))}*/}


                <button className={styles.ButtonMy}>Показать товары</button>
            </div>
        </div>
    );
};

export default ProductFilterModal;

import React, { useContext, useState } from 'react';
import styles from './ProductFilterModal.module.scss';
import { CartContext } from '../../contexts/CartContext';
import Button from '@mui/material/Button';
import { filters } from '../../data/filters';

const ProductFilterModal = () => {
    const { isFilterModalOpen, closeFilterModal } = useContext(CartContext);
    const [filter, setFilter] = useState({
        category: '',
        brand: '',
        priceRange: [filters.minPrice, filters.maxPrice],
        characteristics: {}
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
    };

    const handleCharacteristicChange = (name, value) => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            characteristics: {
                ...prevFilter.characteristics,
                [name]: value
            }
        }));
    };

    const handleApplyFilter = () => {
        // Logic to apply filter
        closeFilterModal();
    };

    return (
        <div className={`${styles.productFilterModal} ${isFilterModalOpen ? styles.show : ''}`}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={closeFilterModal}>✕</button>
                <h2>Фильтр</h2>

                <div className={styles.filterSection}>
                    <h3>Доставка</h3>
                    <h3>Категории</h3>
                    <select name="category" onChange={handleFilterChange}>
                        <option value="">Все</option>
                        {filters.categories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.filterSection}>
                    <h3>Бренды</h3>
                    <select name="brand" onChange={handleFilterChange}>
                        <option value="">Все</option>
                        {filters.brands.map((brand) => (
                            <option key={brand} value={brand}>{brand}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.filterSection}>
                    <h3>Цена</h3>
                    <input
                        type="range"
                        name="priceRange"
                        min={filters.minPrice}
                        max={filters.maxPrice}
                        value={filter.priceRange}
                        onChange={(e) =>
                            setFilter({ ...filter, priceRange: [e.target.value, filter.priceRange[1]] })
                        }
                    />
                    <input
                        type="range"
                        name="priceRange"
                        min={filters.minPrice}
                        max={filters.maxPrice}
                        value={filter.priceRange}
                        onChange={(e) =>
                            setFilter({ ...filter, priceRange: [filter.priceRange[0], e.target.value] })
                        }
                    />
                    <div>
                        <span>от {filter.priceRange[0]} т</span>
                        <span>до {filter.priceRange[1]} т</span>
                    </div>
                </div>

                {filters.characteristics.map((characteristic) => (
                    <div key={characteristic.name} className={styles.filterSection}>
                         <h3>{characteristic.name}</h3>
                        {characteristic.values.map((value) => (
                            <label key={value}>
                                <input
                                    type="checkbox"
                                    name={characteristic.name}
                                    value={value}
                                    onChange={(e) =>
                                        handleCharacteristicChange(
                                            characteristic.name,
                                            e.target.checked
                                                ? [...(filter.characteristics[characteristic.name] || []), value]
                                                : (filter.characteristics[characteristic.name] || []).filter((v) => v !== value)
                                        )
                                    }
                                />
                                {value}
                            </label>
                        ))}
                    </div>
                ))}

                <Button variant="contained" color="primary" onClick={handleApplyFilter}>
                    Показать товары
                </Button>
            </div>
        </div>
    );
};

export default ProductFilterModal;

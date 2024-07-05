import React, { useContext, useState } from 'react';
import styles from './ProductFilterModal.module.scss';
import { CartContext } from '../../contexts/CartContext';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

function valuetext(value) {
    return `${value}°C`;
}

function RangeSlider() {
    const [value, setValue] = React.useState([20, 37]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: 460 }}>
            <Slider
                getAriaLabel={() => 'Price range'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
            />
        </Box>
    );
}

const ProductFilterModal = ({ onFilterApply, categories, brands, minPrice, maxPrice, characteristics }) => {
    const { isFilterModalOpen, closeFilterModal } = useContext(CartContext);
    const [filter, setFilter] = useState({
        category: '',
        brand: '',
        minPrice: minPrice,
        maxPrice: maxPrice,
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
        onFilterApply(filter);
        closeFilterModal();
    };

    if (!categories || !brands) {
        return null;
    }

    return (
        <div className={`${styles.productFilterModal} ${isFilterModalOpen ? styles.show : ''}`}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={closeFilterModal}>✕</button>
                <h2>Фильтр</h2>

                <div className={styles.filterSection}>
                    <h3>Доставка</h3>
                    <h3>Категории</h3>
                    <div className={styles.selectContainer}>
                        <select name="category" onChange={handleFilterChange} className={styles.selectButtons}>
                            <option value="">Все</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className={styles.filterSection}>
                    <h3>Бренды</h3>
                    <select name="brand" onChange={handleFilterChange} className={styles.selectButtons}>
                        <option value="">Все</option>
                        {brands.map((brand) => (
                            <option key={brand} value={brand}>{brand}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.filterSection}>
                    <h3>Цена</h3>
                    <RangeSlider />
                    <div>
                        <span>от {filter.minPrice} т</span>
                        <span>до {filter.maxPrice} т</span>
                    </div>
                </div>

                {characteristics.map((characteristic) => (
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

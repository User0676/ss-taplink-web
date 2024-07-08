import React, { useContext, useEffect, useState } from 'react';
import styles from './ProductFilterModal.module.scss';
import { CartContext } from '../../contexts/CartContext';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Loading from '../Loading/Loading';
import BoxedCheckbox from '../Checkbox/checkbox';
function valuetext(value) {
    return `${value}°C`;
}

function RangeSlider({ minPrice, maxPrice, onChange }) {
    const [value, setValue] = React.useState([minPrice, maxPrice]);

    useState(() => {
        setValue([minPrice, maxPrice])
    }, [minPrice, maxPrice])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
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

const ProductFilterModal = ({ onFilterApply, categories, brands, minPrice, maxPrice, characteristics, onChange, isLoading }) => {
    const { isFilterModalOpen, closeFilterModal } = useContext(CartContext);
    //const [isLoading, setIsLoading] = useState(false)
    const [filter, setFilter] = useState({
        category: '',
        brand: '',
        minPrice: minPrice,
        maxPrice: maxPrice,
        characteristics: {},
    });

    useEffect(() => {
        setFilter((prevFilter) => ({ ...prevFilter, minPrice, maxPrice }));
    }, [minPrice, maxPrice])

    useEffect(() => {
        //setIsLoading(false)
    }, [filter.characteristics])

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        if (name === "category") {
            //setIsLoading(true)
            setFilter((prevFilter) => ({
                ...prevFilter,
                characteristics: {},
                category: value
            }))
        } else {
            setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
        }

        onChange({ ...filter, [name]: value })
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
        return <Loading/>;
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
                    <div className={styles.sliderOnModal}>
                        <RangeSlider minPrice={filter.minPrice} maxPrice={filter.minPrice}
                                     onChange={handleFilterChange}/>
                    </div>
                    <div>
                        <span>от {filter.minPrice?.toString()} т </span>
                        <span>до {filter.maxPrice?.toString()} т</span>
                    </div>
                </div>

                {isLoading && <><Loading/></>}

                {!isLoading && characteristics.map((characteristic) => (
                    <div key={characteristic.name} className={styles.filterSection}>
                        <h3>{characteristic.name}</h3>
                        {characteristic.values.map((value) => (
                            // <label key={value}>
                            //     <input
                            //         type="checkbox"
                            //         name={characteristic.name}
                            //         value={value}
                            //         onChange={(e) =>
                            //             handleCharacteristicChange(
                            //                 characteristic.name,
                            //                 e.target.checked
                            //                     ? [...(filter.characteristics[characteristic.name] || []), value]
                            //                     : (filter.characteristics[characteristic.name] || []).filter((v) => v !== value)
                            //             )
                            //         }
                            //     />
                            //     {value}
                            // </label>
                            <BoxedCheckbox
                                value={value}
                                onClick={(isChecked) => handleCharacteristicChange(
                                    characteristic.name,
                                    isChecked
                                        ? [...(filter.characteristics[characteristic.name] || []), value]
                                        : (filter.characteristics[characteristic.name] || []).filter((v) => v !== value)
                                )}
                            />
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

import React, { useContext } from 'react';
import styles from './SortModal.module.scss';
import { CartContext } from '../../contexts/CartContext';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const SortModal = () => {
    const { isSortModalOpen, closeSortModal, handleSortChange, sortType } = useContext(CartContext);

    return (
        <div className={`${styles.sortModal} ${isSortModalOpen ? styles.show : ''}`}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={closeSortModal}>✕</button>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Сортировка</FormLabel>
                    <RadioGroup value={sortType} onChange={(e) => handleSortChange(e.target.value)}>
                        <FormControlLabel value="Популярные" control={<Radio />} label="Популярные" />
                        <FormControlLabel value="Новинки" control={<Radio />} label="Новинки" />
                        <FormControlLabel value="Сначала дешевые" control={<Radio />} label="Сначала дешевые" />
                        <FormControlLabel value="Сначала дорогие" control={<Radio />} label="Сначала дорогие" />
                        <FormControlLabel value="Высокий рейтинг" control={<Radio />} label="Высокий рейтинг" />
                    </RadioGroup>
                </FormControl>
            </div>
        </div>
    );
};

export default SortModal;

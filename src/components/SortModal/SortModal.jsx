import React, { useContext } from 'react';
import styles from './SortModal.module.scss';
import { CartContext } from '../../contexts/CartContext';

const SortModal = ({ onSortChange }) => {
    const { isSortModalOpen, closeSortModal, handleSortChange, sortType } = useContext(CartContext);

    const onChange = (value) => {
        handleSortChange(value);
        onSortChange(value);
    };

    return (
        <>
            {isSortModalOpen && <div className={styles.blurBackground}></div>}
            <div className={`${styles.sortModal} ${isSortModalOpen ? styles.show : ''}`}>
                <div className={styles.modalContent}>
                    <button className={styles.closeButton} onClick={closeSortModal}>✕</button>
                    <fieldset className={styles.fieldset}>
                        <legend className={styles.legend}>Сортировка</legend>
                        <div className={styles.radioGroup}>
                            <label className={`${styles.radioLabel} ${sortType === "Сначала дешевые" ? styles.selected : ''}`}>
                                <span className={styles.radioText}>Сначала дешевые</span>
                                <input
                                    type="radio"
                                    value="Сначала дешевые"
                                    checked={sortType === "Сначала дешевые"}
                                    onChange={(e) => onChange(e.target.value)}
                                    className={styles.radioInput}
                                />
                            </label>
                            <label className={`${styles.radioLabel} ${sortType === "Сначала дорогие" ? styles.selected : ''}`}>
                                <span className={styles.radioText}>Сначала дорогие</span>
                                <input
                                    type="radio"
                                    value="Сначала дорогие"
                                    checked={sortType === "Сначала дорогие"}
                                    onChange={(e) => onChange(e.target.value)}
                                    className={styles.radioInput}
                                />
                            </label>
                            <label className={`${styles.radioLabel} ${sortType === "Высокий рейтинг" ? styles.selected : ''}`}>
                                <span className={styles.radioText}>Высокий рейтинг</span>
                                <input
                                    type="radio"
                                    value="Высокий рейтинг"
                                    checked={sortType === "Высокий рейтинг"}
                                    onChange={(e) => onChange(e.target.value)}
                                    className={styles.radioInput}
                                />
                            </label>
                        </div>
                    </fieldset>
                </div>
            </div>
        </>
    );
};

export default SortModal;

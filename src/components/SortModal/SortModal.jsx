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
                            <label
                                className={`${styles.radioLabel} ${sortType === "popularity" ? styles.selected : ''}`}>
                                <span className={styles.radioText}>Популярные</span>
                                <input
                                    type="radio"
                                    value="popularity"
                                    checked={sortType === "popularity"}
                                    onChange={(e) => onChange(e.target.value)}
                                    className={styles.radioInput}
                                />
                            </label>
                            <label className={`${styles.radioLabel} ${sortType === "new" ? styles.selected : ''}`}>

                                <span className={styles.radioText}>Новинки</span>
                                <input
                                    type="radio"
                                    value="new"
                                    checked={sortType === "new"}
                                    onChange={(e) => onChange(e.target.value)}
                                    className={styles.radioInput}
                                />
                            </label>
                            <label className={`${styles.radioLabel} ${sortType === "price" ? styles.selected : ''}`}>
                                <span className={styles.radioText}>Сначала дешевые</span>
                                <input
                                    type="radio"
                                    value="price"
                                    checked={sortType === "price"}
                                    onChange={(e) => onChange(e.target.value)}
                                    className={styles.radioInput}
                                />
                            </label>
                            <label
                                className={`${styles.radioLabel} ${sortType === "price-desc" ? styles.selected : ''}`}>

                                <span className={styles.radioText}>Сначала дорогие</span>
                                <input
                                    type="radio"
                                    value="price-desc"
                                    checked={sortType === "price-desc"}
                                    onChange={(e) => onChange(e.target.value)}
                                    className={styles.radioInput}
                                />
                            </label>
                            <label className={`${styles.radioLabel} ${sortType === "rating" ? styles.selected : ''}`}>

                                <span className={styles.radioText}>Высокий рейтинг</span>
                                <input
                                    type="radio"
                                    value="rating"
                                    checked={sortType === "rating"}
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

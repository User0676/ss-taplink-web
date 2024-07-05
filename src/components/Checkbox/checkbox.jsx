import React, { useContext, useEffect, useState } from 'react';
import styles from './checkbox.module.scss'

const BoxedCheckbox = ({ value, onClick }) => {
    const [selected, setSelected] = useState(false);

    const handleButtonClick = () => {
        onClick(!selected);
        setSelected(!selected);
    }

    return (
        <button className={`${styles[`checkbox-btn${selected ? '-selected' : ''}`]} ${styles['checkbox-btn-shared']}`} value={value} onClick={handleButtonClick}>{value}</button>
    )
}

export default BoxedCheckbox

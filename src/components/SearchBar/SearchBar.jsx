import React, { useContext, useState } from 'react';
import styles from './SearchBar.module.scss';
import { TextField } from '@mui/material';
import Button from "@mui/material/Button";
import FilterListIcon from "@mui/icons-material/Tune";
import { CartContext } from "../../contexts/CartContext";

const SearchBar = () => {
    const { openFilterModal } = useContext(CartContext);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        console.log(query); // выводим значение в терминал
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            console.log('Enter pressed:', searchQuery); // отправляем значение при нажатии Enter
        }
    };

    return (
        <div className={styles.searchWithFilter}>
            <div className={styles.searchBar}>
                <TextField
                    fullWidth
                    placeholder="Поиск в магазине"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyPress={handleKeyPress} // добавляем обработчик нажатия клавиши
                />
            </div>
            <Button onClick={openFilterModal}><FilterListIcon /></Button>
        </div>
    );
};

export default SearchBar;

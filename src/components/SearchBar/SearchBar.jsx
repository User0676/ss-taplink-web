import React from 'react';
import styles from './SearchBar.module.scss';
import { TextField } from '@mui/material';

const SearchBar = () => {
    return (
        <div className={styles.searchBar}>
            <TextField fullWidth variant="outlined" placeholder="Поиск в магазине" />
        </div>
    );
};

export default SearchBar;

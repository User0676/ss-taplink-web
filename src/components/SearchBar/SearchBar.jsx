import React, {useContext} from 'react';
import styles from './SearchBar.module.scss';
import { TextField } from '@mui/material';
import Button from "@mui/material/Button";
import FilterListIcon from "@mui/icons-material/Tune";
import {CartContext} from "../../contexts/CartContext";


const SearchBar = () => {

        const {openFilterModal, openSortModal, sortType} = useContext(CartContext);


        return (
            <div className={styles.searchWithFilter}>
                <div className={styles.searchBar}>
                    <TextField fullWidth placeholder="Поиск в магазине"/>

                </div>
                <Button onClick={openFilterModal}><FilterListIcon/></Button>
            </div>
        )
};

export default SearchBar;

import React, { useContext, useState } from 'react';
import styles from './SearchBar.module.scss';
import { TextField, Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/Tune';
import { CartContext } from '../../contexts/CartContext';
import { styled } from '@mui/material/styles';

const GreenBorderTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            //borderRadius: '16px',
            borderColor: 'lightgray'

        },
        '&:hover fieldset': {
            borderColor: 'lightgray',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'grey',
        },
    },
});

const SearchBar = ({onSubmit}) => {
    const { openFilterModal } = useContext(CartContext);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        console.log(query); // выводим значение в терминал
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            onSubmit(searchQuery);
            console.log('Enter pressed:', searchQuery); // отправляем значение при нажатии Enter
        }
    };

    return (
        <div className={styles.searchWithFilter}>
            <div className={styles.searchBar}>
                <GreenBorderTextField
                    fullWidth
                    placeholder="Поиск в магазине"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyPress={handleKeyPress} // добавляем обработчик нажатия клавиши
                />
            </div>
            {/*<button className={styles.filterButton} onClick={openFilterModal}><FilterListIcon className="FLIcon" /></button>*/}
        </div>
    );
};

export default SearchBar;

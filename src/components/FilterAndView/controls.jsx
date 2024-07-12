import React, { useContext } from 'react';
import styles from './controls.module.scss';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import SortIcon from '@mui/icons-material/Sort';
import { CartContext } from '../../contexts/CartContext';
import { styled } from '@mui/material/styles';
import sortikIcon from '../../assets/icons/sortikIcon.svg'

const CustomButtonGroup = styled(ButtonGroup)({

    '.MuiButtonGroup-grouped': {
        minWidth: '40px',
        color: 'black',
        borderColor: 'lightgrey',
        marginLeft: '5px'
        //top: '-25px'

    },
    '&:hover fieldset': {
        borderColor: 'lightgray',
    },
    '&.Mui-focused fieldset': {
        borderColor: 'grey',
    },

});

const RoundedSortIcon = styled(SortIcon)({
    borderRadius: '50%',
    backgroundColor: 'transparent',
    padding: '4px',
    boxSizing: 'border-box',
    fontSize: '2rem !important'
});

const FilterSortControls = ({ onViewChange, onSortChange }) => {
    const { openFilterModal, openSortModal, sortType } = useContext(CartContext);

    return (
        <div className={styles.filterSortControls}>
            <CustomButtonGroup variant="outlined" aria-label="outlined button group" className={styles.sortAll}>
                <Button onClick={openSortModal} className={styles.sortFull}>
                    <RoundedSortIcon style={{ fontSize: '1.8rem' }}/>


                </Button>
            </CustomButtonGroup>
        </div>
    );
};

export default FilterSortControls;

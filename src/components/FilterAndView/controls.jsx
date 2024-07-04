import React, { useContext } from 'react';
import styles from './controls.module.scss';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import FilterListIcon from '@mui/icons-material/Tune';
import SortIcon from '@mui/icons-material/Sort';
import { CartContext } from '../../contexts/CartContext';

const FilterSortControls = ({ onViewChange }) => {
    const { openFilterModal, openSortModal, sortType } = useContext(CartContext);

    return (
        <div className={styles.filterSortControls}>
            <ButtonGroup variant="outlined" aria-label="outlined button group">
                <Button onClick={openSortModal}>
                    <SortIcon /> {sortType}
                </Button>
                <Button onClick={() => onViewChange('grid')}><ViewModuleIcon /></Button>
                <Button onClick={() => onViewChange('list')}><ViewListIcon /></Button>
                <Button onClick={openFilterModal}><FilterListIcon /></Button>
            </ButtonGroup>
        </div>
    );
};

export default FilterSortControls;


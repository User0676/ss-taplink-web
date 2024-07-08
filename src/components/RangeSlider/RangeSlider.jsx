import React, { useState, useEffect } from 'react';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

function valuetext(value) {
    return `${value}₸`;
}

function RangeSlider2({ minPrice, maxPrice, onChange }) {
    const [value, setValue] = useState([minPrice, maxPrice]);

    useEffect(() => {
        setValue([minPrice, maxPrice]);
    }, [minPrice, maxPrice]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        onChange(newValue); // Pass the updated values to the parent component
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Slider
                getAriaLabel={() => 'Price range'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                min={minPrice}
                max={maxPrice} // Adjust according to your requirements
            />
        </Box>
    );
}

export default RangeSlider2;

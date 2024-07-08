import React, { useEffect, useState } from 'react';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

function valuetext(value) {
    return `${value}°C`;
}

function RangeSlider2({ minPrice, maxPrice, onChange }) {
    const [value, setValue] = useState([minPrice, maxPrice]);

    useEffect(() => {
        setValue([minPrice, maxPrice]);
    }, [minPrice, maxPrice]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        onChange(newValue);
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
                max={maxPrice}
            />
        </Box>
    );
}

export default RangeSlider2;
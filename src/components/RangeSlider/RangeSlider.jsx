import React, {useState} from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";



function valuetext(value) {
    return `${value}°C`;
}

function RangeSlider({ minPrice, maxPrice, onChange }) {
    const [value, setValue] = React.useState([minPrice, maxPrice]);

    useState(() => {
        setValue([minPrice, maxPrice])
    }, [minPrice, maxPrice])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Slider
                getAriaLabel={() => 'Price range'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
            />
        </Box>
    );
}
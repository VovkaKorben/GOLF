import React, { useEffect, useState } from "react";



const TeeSelect = ({ changed_callback, tagname, style, initValue }) => {
    const [value, setValue] = useState('');

    const selector_data = [
        { 'id': 0, 'caption': 'White', 'color': 'white' },
        { 'id': 1, 'caption': 'Yellow', 'color': 'yellow' },
        { 'id': 2, 'caption': 'Blue', 'color': 'blue' },
        { 'id': 3, 'caption': 'Red', 'color': 'red' }
    ];

    function get_svg(fill_color) {
        return (
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <circle
                    cx="10" cy="10"
                    r="9"
                    fill={fill_color}
                    stroke="black"
                    stroke-width="1"
                    shapeRendering="geometricPrecision"
                />
            </svg>);
    }

    const onChange = (event) => {
        const newValue = event.target.value;
        setValue(newValue);
        if (changed_callback)
            changed_callback(tagname, newValue.trim() === '' ? null : parseInt( newValue));
    };

   useEffect(() => { setValue(initValue ? initValue : ''); }, [initValue]);

    return (
        <div className="select-container">
            <label htmlFor="color-dropdown">Select a tee: </label>
            <select
                className="custom-select"
                onChange={onChange}
                style={style}
                value={value}
            >
                <option value="" >Select</option>
                {selector_data.map((data) => (
                    <option key={data.id} value={data.id}>
                        {/* {get_svg(data.color)}<span>{data.caption}</span> */}
                        {data.caption}
                    </option>
                ))}


            </select>

        </div>


    );
};

export default TeeSelect;
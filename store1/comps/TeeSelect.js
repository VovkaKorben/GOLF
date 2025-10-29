import React, {  useState } from "react";



const TeeSelect = ({ changed_callback, tagname, style }) => {
    const [value, setValue] = useState("");

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
        const new_value = event.target.value;
        setValue(new_value);
        if (changed_callback)
            changed_callback(tagname, new_value);
    };


    return (
        <div className="select-container">
            <label htmlFor="color-dropdown">Select a tee: </label>
            <select
                className="custom-select"
                onChange={onChange}
                style={style}
                 value={value}
            >
                <option value="" disabled hidden>Select</option>
                {selector_data.map((data) => (
                    <option key={data.id} value={data.id}>
                        {get_svg(data.color)}
                        {/* <img src="usa.jpg" alt="111" /> */}
                        <span> {data.caption}</span>
                    </option>
                ))}


            </select>

        </div>


    );
};

export default TeeSelect;
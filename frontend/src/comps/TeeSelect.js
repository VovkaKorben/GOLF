import React, { useEffect, useState } from "react";



const TeeSelect = ({ changed_callback, style, initValue }) => {
    const [value, setValue] = useState("");

    const selector_data = [
        { 'id': "0", 'caption': 'White', 'color': 'white' },
        { 'id': "1", 'caption': 'Yellow', 'color': 'yellow' },
        { 'id': "2", 'caption': 'Blue', 'color': 'blue' },
        { 'id': "3", 'caption': 'Red', 'color': 'red' }
    ];


    const onChange = (event) => {

        const newValue = event.target.value;
        console.log(`tee onChange: ${newValue}`);
        setValue(newValue);
        if (changed_callback)
            // changed_callback(newValue.trim() === '' ? null : parseInt(newValue));
            changed_callback(newValue === "" ? null : parseInt(newValue, 10));
    };

    useEffect(() => {
        // setValue(initValue ? initValue : ''); 
        setValue(initValue !== null && initValue !== undefined ? initValue.toString() : "");
    }, [initValue]);

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
                        {data.caption}
                    </option>
                ))}


            </select>

        </div>


    );
};

export default TeeSelect;
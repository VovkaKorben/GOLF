import React, { useEffect, useState } from "react";



const GenderSelect = ({ changed_callback, style, initValue }) => {
    const [value, setValue] = useState('');




    const selector_data = [
        { 'id': '0', 'caption': 'Male' },
        { 'id': '1', 'caption': 'Female' }
    ];

    const onChange = (event) => {
        const newValue = event.target.value;
        setValue(newValue);
        if (changed_callback)
            //   changed_callback( newValue.trim() === '' ? null : parseInt( newValue));
            changed_callback(newValue === "" ? null : parseInt(newValue, 10));

    };

    useEffect(() => {
        // setValue(initValue ? initValue : '');
        setValue(initValue !== null && initValue !== undefined ? initValue.toString() : "");
    }, [initValue]);

    return (
        <div className="select-container">
            <label htmlFor="color-dropdown">Select player gender: </label>
            <select
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

export default GenderSelect;
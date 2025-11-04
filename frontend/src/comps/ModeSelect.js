import React, { useEffect, useState } from "react";

const ModeSelect = ({ changed_callback, style, initValue = null }) => {
    const [value, setValue] = useState('');
    const selector_data = [
        { 'id': '0', 'caption': 'Lyöntipeli (Stroke play)' },
        { 'id': '1', 'caption': 'Reikäpeli (Match play)' },
        { 'id': '2', 'caption': 'Pistebogey (Bogey play)' },
        { 'id': '3', 'caption': 'Scratch (Stroke play)' }
    ];

    const onChange = (event) => {
        const newValue = event.target.value;
        setValue(newValue);
        if (changed_callback)
            // changed_callback( newValue.trim() === '' ? null : parseInt(newValue));
            changed_callback(newValue === "" ? null : parseInt(newValue, 10));
    };

    useEffect(() => {
        setValue(initValue ? initValue : '');
        setValue(initValue !== null && initValue !== undefined ? initValue.toString() : "");
    }, [initValue]);

    return (
        <div className="select-container">
            <label htmlFor="color-dropdown">Select calculation mode: </label>
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

export default ModeSelect;
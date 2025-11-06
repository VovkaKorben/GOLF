import React, { useEffect, useState } from "react";
import { mode_selector_data } from '../consts.js';
const ModeSelect = ({ changed_callback, style, initValue = null }) => {
    const [value, setValue] = useState('');


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
                {mode_selector_data.map((data) => (
                    <option key={data.id} value={data.id} disabled={!data.enabled}>
                        {data.caption}
                    </option>
                ))}


            </select>

        </div>


    );
};

export default ModeSelect;
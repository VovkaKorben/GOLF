import React, { useEffect, useState } from "react";



const GenderSelect = ({ changed_callback, tagname, style, initValue }) => {
    const [value, setValue] = useState(initValue);




    const selector_data = [
        { 'id': '0', 'caption': 'Male' },
        { 'id': '1', 'caption': 'Female' }
    ];

    const onChange = (event) => {
        const newValue = event.target.value;
        setValue(newValue);
        if (changed_callback)
            changed_callback(tagname, newValue);

    };

    useEffect(() => { setValue(initValue); }, [initValue]);

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
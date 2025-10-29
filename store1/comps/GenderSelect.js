import React, {  useState } from "react";



const GenderSelect = ({ changed_callback, tagname, style }) => {
    const [value, setValue] = useState("");




    const selector_data = [
        {
            'id': '0',
            'caption': 'Male'
        },
        {
            'id': '1',
            'caption': 'Female'
        }
    ];

    const onChange = (event) => {
        const new_value = event.target.value;
        setValue(new_value);
        if (changed_callback)
            changed_callback(tagname, new_value);

    };


    return (
        <div className="select-container">
            <label htmlFor="color-dropdown">Select player gender: </label>
            <select
                onChange={onChange}
                style={style}
                value={value}
            >
                <option value=""
                 disabled hidden 
                 className="select-placeholder"
                 >Select</option>
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
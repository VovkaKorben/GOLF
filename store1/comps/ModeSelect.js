import React, { useEffect, useState } from "react";



const ModeSelect = ({ changed_callback, tagname, style }) => {
    const [value, setValue] = useState("");




    const selector_data = [
        {
            'id': '0',
            'caption': 'Lyöntipeli (Stroke play)'
        },
        {
            'id': '1',
            'caption': 'Reikäpeli (Match play)'
        },
        {
            'id': '2',
            'caption': 'Pistebogey (Bogey play)'
        },
        {
            'id': '3',
            'caption': 'Scratch (Stroke play)'
        }
    ];


    useEffect(() => {


        // fetchPlaces();
    }, []);

    const onChange = (event) => {
        const new_value = event.target.value;
        setValue(new_value);
        if (changed_callback)
            changed_callback(tagname, new_value);

    };


    return (
        <div className="select-container">
            <label htmlFor="color-dropdown">Select calculation mode: </label>
            <select

                onChange={onChange}
                style={style}
                 value={value}
            >
             <option value="" disabled hidden>Select</option>
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
import React, { useEffect, useState } from "react";



const ModeSelect = ({ onValueChanged,style }) => {
    const [mode, setMode] = useState(0);




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

    const onChanged = (event) => {
        const value = event.target.value;
        setMode(value);
        if (onValueChanged)
            onValueChanged(value);
     
    };


    return (
        <div className="select-container">
            <label htmlFor="color-dropdown">Select calculation mode: </label>
            <select
                class="custom-select"
                onChange={onChanged}
                style={style}
            >
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
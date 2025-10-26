import React, { useEffect, useState } from "react";



const TextInput = ({ onValueChanged,caption,style }) => {
    const [value, setValue] = useState(0);




    useEffect(() => {


        // fetchPlaces();
    }, []);

    const onChanged = (event) => {
        const value = event.target.value;
        setValue(value);
        if (onValueChanged)
            onValueChanged(value);
     
    };


    return (
        <div className="select-container">
            <label htmlFor="color-dropdown">{caption}: </label>
            <input type="text"
                value={value}
                onChange={onChanged}
               
            />

        </div>


    );
};

export default TextInput;
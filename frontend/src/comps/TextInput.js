import React, { useEffect, useState } from "react";



const TextInput = ({ caption, style, changed_callback,tagname }) => {
    const [value, setValue] = useState("");




    useEffect(() => {


        // fetchPlaces();
    }, []);

    const onChange = (event) => {
        const value = event.target.value;
        setValue(value);
        if (changed_callback)
            changed_callback(tagname, value);

    };


    return (
        <div className="select-container">
            <label htmlFor="color-dropdown">{caption}: </label>
            <input type="text"
                value={value}
                onChange={onChange}
placeholder="enter text here"
            />

        </div>


    );
};

export default TextInput;
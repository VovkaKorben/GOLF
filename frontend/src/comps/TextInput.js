import React, { useEffect, useState } from "react";



const TextInput = ({
    caption,

    changed_callback,
    
    placeholder,
    initValue = null
}) => {
    const [value, setValue] = useState("");

    // useEffect(() => { setValue(initValue); }, [initValue]);

    useEffect(() => { setValue(initValue ? initValue : ''); }, [initValue]);

    const onChange = (event) => {
        const newValue = event.target.value;
        setValue(newValue);
        if (changed_callback)
            changed_callback( newValue);

    };

    // console.log(`[${caption}]init_value: ${initValue}`);    console.log(`[${caption}]init_value: ${inputValue}`);
    return (
        <div className="select-container">
            <label htmlFor="color-dropdown">{caption}: </label>
            <input type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}

            />

        </div>


    );
};

export default TextInput;
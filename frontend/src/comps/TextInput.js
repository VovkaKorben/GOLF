import React, { useEffect, useState } from "react";



const TextInput = ({
    caption,

    changed_callback,
    tagname,
    placeholder,
    initValue = ""
}) => {
    const [inputValue, setEditValue] = useState(initValue);

    useEffect(() => {
        setEditValue(initValue);
    }, [initValue]); // Зависимость от init_value


    const onChange = (event) => {
        const newValue = event.target.value;
        setEditValue(newValue);
        if (changed_callback)
            changed_callback(tagname, newValue);

    };

    // console.log(`[${caption}]init_value: ${initValue}`);    console.log(`[${caption}]init_value: ${inputValue}`);
    return (
        <div className="select-container">
            <label htmlFor="color-dropdown">{caption}: </label>
            <input type="text"
                value={inputValue}
                onChange={onChange}
                placeholder={placeholder}

            />

        </div>


    );
};

export default TextInput;
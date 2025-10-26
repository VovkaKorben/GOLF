import React, { useEffect, useState } from "react";

const int_regex = /^-?\d+$/
const float_regex = /^-?\d*\.\d+$/

function isIntString(str) {
    return int_regex.test(str)
}

function isFloatString(str) {
    return float_regex.test(str)
}

const NumInput = ({ allowFloat, className, style, onChanged }) => {
    const [value, setValue] = useState([]);
    const [ErrorClass, setErrorClass] = useState('');
    // const [error, setError] = useState('');


    const checkInput = (v) => {
    };

    useEffect(() => {


        checkInput();
    }, []);

    const inputChanged = (event) => {
        const newValue = event.target.value;
        setValue(newValue);
        // if (n
        if (isIntString(newValue) || (isFloatString(newValue) && allowFloat))
            setErrorClass('')
        else
            setErrorClass('error')
    };



    return (
        <>
            <input type="text"
                value={value}
                onChange={inputChanged}
                // className="{className} {ErrorClass}"
                className={`${className || ''} ${ErrorClass || ''}`}
                style={style}
            />
           
        </>
    );
};

export default NumInput;
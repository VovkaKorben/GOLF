import React, { useEffect, useState } from "react";




function isIntString(str) {
    const int_regex = /^-?\d+$/
    return int_regex.test(str)
}

function isFloatString(str) {
    const float_regex = /^-?\d*\.\d*$/
    return float_regex.test(str)
}

const NumInput = ({ allowFloat,
    className,
    style,
    changed_callback,
    initValue = null,
    edit_index = 0
}) => {
    const [value, setValue] = useState('');
    const [ErrorClass, setErrorClass] = useState('');


    useEffect(() => {
        // console.log(`NumInput initValue: ${typeof initValue}, <${initValue}>`);
        setValue(initValue === null ? '' : initValue.toString());
    }, [initValue]);

    useEffect(() => {
        // console.log(`NumInput value: ${typeof value}, <${value}>`);
    }, [value]);

    const onChange = (event) => {
        const newValue = event.target.value.trim();
        setValue(newValue);

        if (newValue === '' || isIntString(newValue) || (isFloatString(newValue) && allowFloat)) {
            setErrorClass('');
            if (changed_callback) {
                let retval;
                if (newValue === '')
                    retval = null;
                else if (allowFloat)
                    retval = parseFloat(newValue)
                else
                    retval = parseInt(newValue);
                // console.log(`retval value: ${typeof retval}, <${retval}>`);
                changed_callback(retval, edit_index);
            }
        }
        else
            setErrorClass('error')
    };



    return (
        <>
            <input type="text"
                value={value}
                onChange={onChange}
                // className="{className} {ErrorClass}"
                className={`${className || ''} ${ErrorClass || ''}`}
                style={style}
            />

        </>
    );
};

export default NumInput;
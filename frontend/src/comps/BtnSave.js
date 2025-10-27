import React, { useEffect, useState } from "react";



const BtnSave = ({ onClicked, caption }) => {
    const [value, setValue] = useState(0);


    const onClick = () => {
        if (onClicked)
            onClicked();

    };


    return (
        <button value="Save"
            onClick={onClick}
        >
            Save
            </button>

    );
};

export default BtnSave;
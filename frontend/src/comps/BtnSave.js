import React from "react";



const BtnSave = ({ onClicked, caption }) => {



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
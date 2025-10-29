import React, { useEffect } from "react";



const Btn = ({ onClicked, caption = "Default" }) => {



    const onClick = () => {
        if (onClicked)
            onClicked();

    };

    return (
        <button value="Save"
            onClick={onClick}
        >
            {caption}
        </button>

    );
};

export default Btn;